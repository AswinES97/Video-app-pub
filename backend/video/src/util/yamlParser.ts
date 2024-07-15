import fs from "fs";
import yaml from "yaml";

export const parseYaml = async (filePath: string, userId: string) => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const docs = yaml.parseAllDocuments(fileContent).map((doc) => {
      let docString = doc.toString();
      const regex = new RegExp(`service_name`, "g");
      docString = docString.replace(regex, userId);
      // console.log("yaml before parsing - ",docString);
      return yaml.parse(docString);
    });
    return docs;
  } catch (error) {
    console.log(error);
  }
};
