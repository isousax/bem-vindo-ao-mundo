export interface DedicationData {
  customText: {
    title_photos: string;
    title_message: string;
    message: string;
    assign: string;
    sub_title_final: string;
    title_journey: string;
    music_phrase: string;
    music_description: string;
  };
  basic: {
    email: string;
    nome_baby: string;
    sexo_baby: string;
    data_nascimento: string;
    peso_baby: string;
    altura_baby?: string;
    data_pregnancy?: string;
    data_ultrasound?: string;
    data_sex?: string;
  };
  photos: Array<{
    preview: string;
    title: string;
    description: string;
  }>;
  music: {
    title: string;
    url: string;
    channel: string;
  };
}
