
# Digital Ocean

## [signup](https://m.do.co/c/67d1621f7325)

    use Pioneer refural and get 100$ free credit 



## Setup digital ocean CLI

```
brew install doctl
```

login:


## create resources

* new project
* new kubelet

download yaml
move to .kube

test nodes 
```
cd ~/.kube && kubectl --kubeconfig="k8s-******-kubeconfig.yaml" get nodes
```


## Build Container registry

```
doctl registry create pioneer
```

## add digital ocean api key to pulumi

```
pulumi config set digitalocean:token YOUR_TOKEN_HERE --secret
```

## use pulumi cli to deploy




##patch service account for imgpull

```
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "pioneer"}]}'
```

Verify kubectl intergation with registry

Manually configure
```
doctl registry kubernetes-manifest | kubectl apply -f -
```

download docker config from registry page

```
kubectl create secret generic do-registry \
  --from-file=.dockerconfigjson=docker-config.json \
  --type=kubernetes.io/dockerconfigjson
```

patch account

```
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "do-registry"}]}'
```

TODO verify spec applied

