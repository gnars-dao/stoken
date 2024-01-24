#!/bin/bash
deploy=$(kubectl get deploy -o name)
for i in $deploy; do kubectl rollout restart $i; done
