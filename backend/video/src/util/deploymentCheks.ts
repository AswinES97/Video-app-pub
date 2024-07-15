import kubeClient from "../config/initKubeClient";

export const checkIfDeploymentExist = async (
  validK8sName: string,
  namespace: string,
) => {
  const { appsV1Api } = kubeClient;
  return await appsV1Api
    .readNamespacedDeployment(validK8sName, namespace)
    .then((data) => {
      return true;
    })
    .catch((err) => {
      // console.log(err);
      if (err.statusCode === 404) {
        // Deployment not found
        return false;
      }
    });
};

export const waitForDeploymentToStabilize = async (
  deploymentName: string,
  namespace: string,
) => {
  const { appsV1Api } = kubeClient;
  const timeout = 60000; // 60 seconds timeout
  const interval = 5000; // Check every 5 seconds
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const response = await appsV1Api.readNamespacedDeployment(
      deploymentName,
      namespace,
    );
    const deployment = response.body;
    if (deployment?.status?.availableReplicas === deployment?.spec?.replicas) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error("Deployment did not stabilize within the timeout period");
};
