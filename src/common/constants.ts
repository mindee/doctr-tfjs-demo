// Detection cfg

export const DET_MEAN = 0.785
export const DET_STD = 0.275
export const DET_SIZE = 512  // TODO: if heavy model selected, set this size to 1024
export const DET_MODEL_URL = "models/detection/model.json" // TODO: if heavy model selected, set the other model url

// Recognition cfg

export const REC_MEAN = 0.694
export const REC_STD = 0.298
export const REC_MODEL_URL = "models/crnn/model.json"
export const VOCAB = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~°àâéèêëîïôùûçÀÂÉÈËÎÏÔÙÛÇ£€¥¢฿"
