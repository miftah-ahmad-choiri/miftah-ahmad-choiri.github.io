---
title: | 
        How to Install Ansible AWX🚀 <br>
        ![Ansible](https://img.shields.io/badge/ansible-automation-red)
        ![Ansible Tower](https://img.shields.io/badge/ansible--tower-management--ui-blue)
        ![Ansible AWX](https://img.shields.io/badge/ansible--awx-open--source--ui-green)

permalink: /docs/how-to-install-awx/
excerpt: "This guide explain how to Install Ansible AWX on RHEL9"
last_modified_at: 2025-02-08T21:36:18-04:00
toc: true

---

## 🔥 1. Disable Firewall and Configure SELinux
```bash
systemctl stop firewalld
systemctl disable firewalld
vi /etc/selinux/config
```
```properties
selinux=disabled
```
{:.no-copy .notice--info}

## 👤 2. Create and Configure User
```bash
useradd miftah
passwd miftah
sudo visudo
```
**Output:**
_The user 'miftah' has been created and configured._

## 🔑 3. Register System and Install Required Packages
```bash
su miftah
sudo whoami
sudo subscription-manager register
sudo dnf -y install dnf-plugins-core
```
**Output:**
_Registration successful. dnf-plugins-core installed._

## 🗑️ 4. Remove Existing Container Packages
```bash
sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine \
                  podman \
                  runc
```
**Output:**
_Old container packages removed successfully._

## 🐳 5. Install Docker
```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
**Output:**
_Docker installed successfully._

## ✅ 6. Verify Docker Installation
```bash
sudo docker run hello-world
sudo docker images
sudo docker ps -a
```
**Output:**
_Hello from Docker! Docker is running successfully._

## 🏗️ 7. Install Minikube and Kubectl
```bash
sudo curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
echo "$(cat kubectl.sha256) kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```
**Output:**
_Minikube and Kubectl installed successfully._

## 🔧 8. Configure Docker Permissions
```bash
sudo usermod -aG docker miftah
newgrp docker
docker ps
```
**Output:**
_User 'miftah' added to the docker group._

## 🚀 9. Start Minikube
```bash
minikube start --apiserver-ips=10.0.0.122 --host-only-cidr=10.0.0.122/24
```
**Output:**
```output
😄  minikube v1.35.0 on Redhat 9.4 (amd64)
✨  Automatically selected the docker driver. Other choices: none, ssh
📌  Using Docker driver with root privileges
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.46 ...
💾  Downloading Kubernetes v1.32.0 preload ...
    > gcr.io/k8s-minikube/kicbase...:  500.31 MiB / 500.31 MiB  100.00% 4.74 Mi
    > preloaded-images-k8s-v18-v1...:  333.57 MiB / 333.57 MiB  100.00% 3.14 Mi
🔥  Creating docker container (CPUs=2, Memory=2200MB) ...
🐳  Preparing Kubernetes v1.32.0 on Docker 27.4.1 ...
❗  Failing to connect to https://registry.k8s.io/ from both inside the minikube container and host machine
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```
{:.no-copy .notice--info}

## 📦 10. Clone and Deploy AWX Operator
```bash
git clone git@github.com:ansible/awx-operator.git
cd awx-operator
git checkout tags/2.19.0
export VERSION=2.19.0
make deploy
```
**Output:**
```txt
namespace/awx created
customresourcedefinition.apiextensions.k8s.io/awxbackups.awx.ansible.com created
customresourcedefinition.apiextensions.k8s.io/awxmeshingresses.awx.ansible.com created
customresourcedefinition.apiextensions.k8s.io/awxrestores.awx.ansible.com created
customresourcedefinition.apiextensions.k8s.io/awxs.awx.ansible.com created
serviceaccount/awx-operator-controller-manager created
role.rbac.authorization.k8s.io/awx-operator-awx-manager-role created
role.rbac.authorization.k8s.io/awx-operator-leader-election-role created
clusterrole.rbac.authorization.k8s.io/awx-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/awx-operator-proxy-role created
rolebinding.rbac.authorization.k8s.io/awx-operator-awx-manager-rolebinding created
rolebinding.rbac.authorization.k8s.io/awx-operator-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/awx-operator-proxy-rolebinding created
configmap/awx-operator-awx-manager-config created
service/awx-operator-controller-manager-metrics-service created
deployment.apps/awx-operator-controller-manager created
```
{:.no-copy .notice--info}

## ⚙️ 11. Deploy AWX Instance
```bash
vi kustomization.yaml
```
_Add the following content:_
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - github.com/ansible/awx-operator/config/default?ref=2.19.0
  - awx-demo.yml
images:
  - name: quay.io/ansible/awx-operator
    newTag: 2.19.0
namespace: awx
```

```bash
kubectl apply -k .
```
**Output:**
```txt
awx.awx.ansible.com/awx-demo created
```
{:.no-copy .notice--info}

## 🔑 12. Retrieve AWX Admin Credentials
```bash
kubectl get secret awx-demo-admin-password -o jsonpath="{.data.password}" --namespace=awx | base64 --decode
```
**Output:**
_The generated admin password is displayed._

## 🌐 13. Access AWX
```bash
minikube service awx-demo-service --url -n awx
```
If external IP is not configured for awx service, you need to configure ip tunnel & port forwarding
```bash
kubectl get all -n awx
nohup minikube tunnel &
kubectl -n awx port-forward svc/awx-demo-service --address 0.0.0.0 30539:80 &> /dev/null &
```

### 🔗 AWX Dashboard:
- **Visit:** [**`http://10.0.0.122:30539`**](http://10.0.0.122:30539)
- **Login:** `admin / <retrieved-password>`

## 🖥️ 14. Enable Kubernetes Dashboard
```bash
minikube addons enable dashboard
kubectl get svc -n kubernetes-dashboard
kubectl patch svc kubernetes-dashboard -n kubernetes-dashboard -p '{"spec":{"type":"NodePort"}}'
kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard --address 0.0.0.0 32528:80 &> /dev/null &
```
### 🔗 Kubernetes Dashboard URL:
- **Visit:** [**`http://10.0.0.122:32528`**](http://10.0.0.122:32528)

**🎉 Congratulations! Your AWX setup on RHEL 9 is now complete!** 🚀




























<!-- Scroll to Top Button -->
<button onclick="scrollToTop()" id="scrollToTopBtn" title="Go to top">㐃</button>

<style>
  /* Style for the button */
  #scrollToTopBtn {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed/sticky position */
    bottom: 20px; /* Place the button at the bottom of the page */
    right: 20px; /* Place the button 20px from the right */
    z-index: 99; /* Make sure it does not overlap */
    border: none; /* Remove borders */
    outline: none; /* Remove outline */
    background-color: #555; /* Set a background color */
    color: white; /* Text color */
    cursor: pointer; /* Add a mouse pointer on hover */
    padding: 20px; /* Some padding */
    border-radius: 20px; /* Rounded corners */
    font-size: 15px; /* Increase font size */
  }
  #scrollToTopBtn:hover {
    background-color: #111; /* Darker background on hover */
  }
</style>

<script defer>
  // Show the button when scrolling down
  window.onscroll = function() {
    let btn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>