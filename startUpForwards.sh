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
    echo "Starting port-forwarding for ${services[$i]} on ${ports[$i]}"

    output=$(kubectl port-forward service/"${services[$i]}" ${ports[$i]} -n $NAMESPACE > /dev/null 2>&1 & echo $!)
    if [[ $? -ne 0 ]]; then
      echo "Error: Failed to start port-forwarding for ${services[$i]} on ${ports[$i]}."
      echo "Details: $output"
    else
      echo "Port-forwarding started for ${services[$i]} on ${ports[$i]}"
    fi
  done
  echo "All port-forwarding processes attempted."
}

stop_port_forwarding() {
  echo "Stopping port-forwarding for services..."
  for service in "${services[@]}"; do
    echo "Stopping port-forwarding for $service"

    output=$(pkill -f "kubectl port-forward service/$service" 2>&1)
    if [[ $? -ne 0 ]]; then
      echo "Error: Failed to stop port-forwarding for $service."
      echo "Details: $output"
    else
      echo "Port-forwarding stopped for $service"
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