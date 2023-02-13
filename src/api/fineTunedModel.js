/**
 * FineTunedModel API
 */
import { request } from '../lib/http';
import { fineTunedModel, fineTunedModelCompletion } from '../constants/apiRouting';
import { apiConfig } from '../config';

class FineTunedModelApi {
  list(data) {
    return request(
      'GET',
      fineTunedModel(),
      { data },
      apiConfig.API_VERSIONS.V1
    );
  }
  completions(data, modelId) {
    return request(
      'POST',
      fineTunedModelCompletion(modelId),
      { data },
      apiConfig.API_VERSIONS.V1
    );
  }
}


export const fineTunedModelApi = new FineTunedModelApi();