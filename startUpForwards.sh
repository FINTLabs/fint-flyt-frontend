#!/bin/bash

services=(
  "fint-flyt-archive-gateway"
  "fint-flyt-discovery-service"
  "fint-flyt-configuration-service"
  "fint-flyt-history-service"
  "fint-flyt-integration-service"
  "fint-flyt-instance-service"
  "fint-flyt-value-converting-service"
  "fint-flyt-authorization-service"
)
ports=(
  "8085:8080"
  "8084:8080"
  "8082:8080"
  "8083:8080"
  "8090:8080"
  "8081:8080"
  "8094:8080"
  "8086:8080"
)

NAMESPACE="fintlabs-no"

start_port_forwarding() {
  echo "Starting port-forwarding for services..."

  for i in "${!services[@]}"; do
    local svc="${services[$i]}"
    local port="${ports[$i]}"
    echo "Starting port-forwarding for ${svc} on ${port} (namespace: ${NAMESPACE})"

    kubectl -n "$NAMESPACE" port-forward "service/$svc" "$port" >/dev/null 2>&1 & pid=$!

    if kill -0 "$pid" 2>/dev/null; then
      echo "- Port-forwarding started for ${svc} (PID: $pid)"
    else
       echo "- Error: Failed to start port-forwarding for ${svc}"
    fi
  done

  echo "All port-forwarding processes attempted."
}

stop_port_forwarding() {
  echo "Stopping port-forwarding for services..."

  if ps -eo pid,cmd >/dev/null 2>&1; then
    PS_FORMAT="pid,cmd"
  else
    PS_FORMAT="pid,command"
  fi

  for svc in "${services[@]}"; do

    echo "Stopping port-forwarding for ${svc} (namespace: ${NAMESPACE})"

    pid=$(ps -axo ${PS_FORMAT} \
      | grep "kubectl -n $NAMESPACE port-forward service/$svc" \
      | grep -v grep \
      | awk '{print $1}'
    )

    if [[ -z "$pid" ]]; then
      echo "- No running port-forward process found for ${svc}"
      continue
    fi

    if kill "$pid" 2>/dev/null; then
      echo "- Port-forwarding stopped for ${svc} (PID: $pid)"
    else
      echo "- Error: Could not stop port-forwarding for ${svc}"
    fi
  done

  echo "All port-forwarding processes stopped (or attempted)."
}

case "$1" in
  start)
    start_port_forwarding
    ;;
  stop)
    stop_port_forwarding
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac