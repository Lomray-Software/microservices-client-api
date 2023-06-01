interface IMethodsImporterResult {
  [msName: string]: {
    isSuccess?: boolean;
    error?: string;
  };
}

interface ISyncMetadataInput {
  defaultSchemaRoles?: string[];
  defaultAllowGroup?: string[];
  commonModelAliases?: string[];
  onlyMs?: string[];
}

interface ISyncMetadataOutput {
  microservices: IMethodsImporterResult;
}

export type { ISyncMetadataInput, ISyncMetadataOutput, IMethodsImporterResult };
