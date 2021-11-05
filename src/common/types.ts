export type UploadedFile = {
  source: File;
  image: string;
};

export type Word = {
  id: string;
  words: string[];
  color: string;
  isActive?: boolean;
};
