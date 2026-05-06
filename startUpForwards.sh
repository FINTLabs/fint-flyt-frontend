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

    sleep 1

    if kill -0 "$pid" 2>/dev/null; then
      echo "✅ Started $svc (PID: $pid)"
    else
      echo "❌ Failed to start $svc (crashed immediately)"
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

stop_all_port_forwarding() {
  echo "Stopping all port-forward processes on known ports..."

  for port in 8081 8082 8083 8084 8085 8086 8090 8094; do
    pid_list=$(lsof -ti tcp:$port)

    for pid in $pid_list; do
      if kill "$pid" 2>/dev/null; then
        echo "✅ Stopped process on port $port (PID $pid)"
      else
        echo "❌ Failed to stop PID $pid on port $port"
      fi
    done
  done

  echo "Done."
}


status() {
  echo "===== K8S CONTEXT ====="
  kubectl config current-context

  echo ""
  echo "===== NAMESPACE ====="
  echo "$NAMESPACE"

  echo ""
  echo "===== PORT-FORWARD STATUS ====="
  for i in "${!services[@]}"; do
    svc="${services[$i]}"
    port="${ports[$i]}"

    pid=$(ps -axo pid,command \
      | grep "[k]ubectl" \
      | grep "port-forward" \
      | grep "service/$svc" \
      | grep "$local_port:" \
      | awk '{print $1}')



    if [[ -n "$pid" ]]; then
      echo "✅ $svc ($port) → PID $pid"
    else
      echo "❌ $svc ($port) → NOT RUNNING"
    fi
  done

  echo ""
  echo "===== LISTENING PORTS ====="
  lsof -i -P -n | grep LISTEN | grep -E "8081|8082|8083|8084|8085|8086|8090|8094"

  echo ""
  echo "===== EXPECTED URLS ====="
  for i in "${!services[@]}"; do
    svc="${services[$i]}"
    port_pair="${ports[$i]}"
    local_port="${port_pair%%:*}"

    echo "$svc → http://localhost:$local_port"
  done


  echo ""
}


check_health() {
  for port in 8081 8082 8083 8084 8085 8086 8090 8094; do
    if curl -s "http://localhost:$port" > /dev/null; then
      echo "✅ Port $port is responding"
    else
      echo "❌ Port $port is NOT responding"
    fi
  done
}



case "$1" in
  start)
    start_port_forwarding
    ;;
  stop)
    stop_port_forwarding
    ;;
   stop-all)
    stop_all_port_forwarding
    ;;
  status)
    status
    ;;
  check)
    check_health
    ;;
  *)
    echo "Usage: $0 {start|stop|stop-all|status|check}"
    exit 1
    ;;
esac