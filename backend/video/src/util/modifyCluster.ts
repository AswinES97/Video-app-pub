import path from "node:path/posix";
import kubeClient from "../config/initKubeClient";
import { parseYaml } from "./yamlParser";

export const appyYaml = async (
  kubeManifests: Array<any>,
  namespace: string,
) => {
  try {
    const { appsV1Api, coreV1Api, networkingV1Api } = kubeClient;

    for (const manifest of kubeManifests.reverse()) {
      switch (manifest.kind) {
        case "Deployment":
          await appsV1Api.createNamespacedDeployment(namespace, manifest);
          break;
        case "Service":
          await coreV1Api.createNamespacedService(namespace, manifest);
          break;
        case "Ingress":
          await networkingV1Api.createNamespacedIngress(namespace, manifest);
          break;
        default:
          console.log(`Unsupported kind: ${manifest.kind}`);
      }
    }
  } catch (err) {
    console.log("error applying the parsed yaml :-", err);
    throw new Error("error applying the parsed yaml");
  }
};

export const deleteUploader = async (
  kubeManifests: Array<any>,
  namespace: string,
) => {
  try {
    const { appsV1Api, coreV1Api, networkingV1Api } = kubeClient;

    for (const manifest of kubeManifests) {
      switch (manifest.kind) {
        case "Deployment":
          await appsV1Api.deleteNamespacedDeployment(
            manifest.metadata.name,
            namespace,
          );
          break;
        case "Service":
          await coreV1Api.deleteNamespacedService(
            manifest.metadata.name,
            namespace,
          );
          break;
        case "Ingress":
          await networkingV1Api.deleteNamespacedIngress(
            manifest.metadata.name,
            namespace,
          );
          break;
        default:
          console.log(`Unsupported kind: ${manifest.kind}`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
