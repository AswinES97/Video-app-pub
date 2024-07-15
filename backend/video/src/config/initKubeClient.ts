import {
  KubeConfig,
  AppsV1Api,
  CoreV1Api,
  NetworkingV1Api,
} from "@kubernetes/client-node";

const initKubeClient = () => {
  const kubeconfig = new KubeConfig();
  kubeconfig.loadFromDefault();
  const coreV1Api = kubeconfig.makeApiClient(CoreV1Api);
  const appsV1Api = kubeconfig.makeApiClient(AppsV1Api);
  const networkingV1Api = kubeconfig.makeApiClient(NetworkingV1Api);

  return {
    coreV1Api,
    appsV1Api,
    networkingV1Api,
  };
};

// Immediately initialize the clients
const kubeClients = initKubeClient();

export default kubeClients;
