import { findBestExerciseGif, EXERCISE_GIFS } from './exerciseGifs';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  instructions?: string;
  videoUrl?: string;
  gifUrl?: string;
  thumbnail?: string;
  previewUrl?: string;
  iframeUrl?: string;
  videoGender?: 'M' | 'F';
}

// Complete library of 960 Google Drive GIF exercises catalog
export const EXERCISE_DATABASE: Exercise[] = [
  {
    "id": "drive-1XgqIYXj0hGa6_vm86GqedBCYiMvkAqiV",
    "name": "Abdominal na Máquina",
    "muscleGroup": "Abdômen",
    "equipment": "Máquina",
    "instructions": "Execução de Abdominal na Máquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XgqIYXj0hGa6_vm86GqedBCYiMvkAqiV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XgqIYXj0hGa6_vm86GqedBCYiMvkAqiV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XgqIYXj0hGa6_vm86GqedBCYiMvkAqiV"
  },
  {
    "id": "drive-1HZ9dWLsQJhGACnEwE1NrnjMPxW9mkHBi",
    "name": "Abdominal Alternado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Abdominal Alternado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HZ9dWLsQJhGACnEwE1NrnjMPxW9mkHBi",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HZ9dWLsQJhGACnEwE1NrnjMPxW9mkHBi",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HZ9dWLsQJhGACnEwE1NrnjMPxW9mkHBi"
  },
  {
    "id": "drive-1PnhgJxAF3f-I0rc5zkpoTw7qMkA5lxxI",
    "name": "Abdominal Alternado no Banco",
    "muscleGroup": "Abdômen",
    "equipment": "Banco",
    "instructions": "Execução de Abdominl Banco Alternado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PnhgJxAF3f-I0rc5zkpoTw7qMkA5lxxI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PnhgJxAF3f-I0rc5zkpoTw7qMkA5lxxI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PnhgJxAF3f-I0rc5zkpoTw7qMkA5lxxI"
  },
  {
    "id": "drive-1FGImODWQUyPwT7SjgVHn-xkD7jM1wTpj",
    "name": "Abdominais",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Abdominais. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FGImODWQUyPwT7SjgVHn-xkD7jM1wTpj",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FGImODWQUyPwT7SjgVHn-xkD7jM1wTpj",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FGImODWQUyPwT7SjgVHn-xkD7jM1wTpj"
  },
  {
    "id": "drive-1AKWpo1hEi5bLbFZbFJyqnIT9sO2lzwVQ",
    "name": "Alternado Apoiado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alternado Apoiado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AKWpo1hEi5bLbFZbFJyqnIT9sO2lzwVQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AKWpo1hEi5bLbFZbFJyqnIT9sO2lzwVQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AKWpo1hEi5bLbFZbFJyqnIT9sO2lzwVQ"
  },
  {
    "id": "drive-104jjr6SPVNcS73VaZlfUuqVny0aYNDET",
    "name": "Toque no Calcanhar Alternado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Toque no Calcanhar Alternado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/104jjr6SPVNcS73VaZlfUuqVny0aYNDET",
    "thumbnail": "https://lh3.googleusercontent.com/d/104jjr6SPVNcS73VaZlfUuqVny0aYNDET",
    "previewUrl": "https://lh3.googleusercontent.com/d/104jjr6SPVNcS73VaZlfUuqVny0aYNDET"
  },
  {
    "id": "drive-1kFqZrg1LlwzS9uCU1Vp192Te4N5To0oZ",
    "name": "Abdominal com Bola",
    "muscleGroup": "Abdômen",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Abdominal com Bola. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kFqZrg1LlwzS9uCU1Vp192Te4N5To0oZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kFqZrg1LlwzS9uCU1Vp192Te4N5To0oZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kFqZrg1LlwzS9uCU1Vp192Te4N5To0oZ"
  },
  {
    "id": "drive-1_yAYSXRVhFMJZaSmB_fODVC0p_kDdOpx",
    "name": "Abdominal Rollout com Barra",
    "muscleGroup": "Abdômen",
    "equipment": "Barra",
    "instructions": "Execução de Abdominal Rollout com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_yAYSXRVhFMJZaSmB_fODVC0p_kDdOpx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_yAYSXRVhFMJZaSmB_fODVC0p_kDdOpx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_yAYSXRVhFMJZaSmB_fODVC0p_kDdOpx"
  },
  {
    "id": "drive-1pdV2bB9FZe_G7CQsUKsrYBrSWyLM7lb8",
    "name": "Abdominal Rollout com Barra (Variação 2)",
    "muscleGroup": "Abdômen",
    "equipment": "Barra",
    "instructions": "Execução de Abdominal Rollout com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pdV2bB9FZe_G7CQsUKsrYBrSWyLM7lb8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pdV2bB9FZe_G7CQsUKsrYBrSWyLM7lb8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pdV2bB9FZe_G7CQsUKsrYBrSWyLM7lb8"
  },
  {
    "id": "drive-1bPeZs6mfvYZfjgTltB1Bav346bb54rUD",
    "name": "Abdominal Bicicleta",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Abdominal Bicicleta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bPeZs6mfvYZfjgTltB1Bav346bb54rUD",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bPeZs6mfvYZfjgTltB1Bav346bb54rUD",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bPeZs6mfvYZfjgTltB1Bav346bb54rUD"
  },
  {
    "id": "drive-1eaAW_NPw8ECvqBR1_5j5mhjCXqjjpQ3U",
    "name": "Prancha Body Saw (Serrote)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Body Saw Plank. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1eaAW_NPw8ECvqBR1_5j5mhjCXqjjpQ3U",
    "thumbnail": "https://lh3.googleusercontent.com/d/1eaAW_NPw8ECvqBR1_5j5mhjCXqjjpQ3U",
    "previewUrl": "https://lh3.googleusercontent.com/d/1eaAW_NPw8ECvqBR1_5j5mhjCXqjjpQ3U"
  },
  {
    "id": "drive-1AdvsGeO6d3JLZ92g5VkqjpV4CTgEYbCV",
    "name": "Abdominal Borboleta",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Butterfly Sit Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AdvsGeO6d3JLZ92g5VkqjpV4CTgEYbCV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AdvsGeO6d3JLZ92g5VkqjpV4CTgEYbCV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AdvsGeO6d3JLZ92g5VkqjpV4CTgEYbCV"
  },
  {
    "id": "drive-17ilbJEL6agWZX1Xwtlch02E-i5Z5W2If",
    "name": "Abdominal Supra Completo",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Conventional Sit Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17ilbJEL6agWZX1Xwtlch02E-i5Z5W2If",
    "thumbnail": "https://lh3.googleusercontent.com/d/17ilbJEL6agWZX1Xwtlch02E-i5Z5W2If",
    "previewUrl": "https://lh3.googleusercontent.com/d/17ilbJEL6agWZX1Xwtlch02E-i5Z5W2If"
  },
  {
    "id": "drive-1InYOj53BT-1MYgeDR8ebf8HaIHMeCZSV",
    "name": "Abdominal Supra no Solo",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Crunch Floor. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1InYOj53BT-1MYgeDR8ebf8HaIHMeCZSV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1InYOj53BT-1MYgeDR8ebf8HaIHMeCZSV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1InYOj53BT-1MYgeDR8ebf8HaIHMeCZSV"
  },
  {
    "id": "drive-1wEf7V-eJdstjDzDiLfTsgsRp2p95Gci3",
    "name": "Abdominal com Elevação de Pernas",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Crunch With Leg Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wEf7V-eJdstjDzDiLfTsgsRp2p95Gci3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wEf7V-eJdstjDzDiLfTsgsRp2p95Gci3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wEf7V-eJdstjDzDiLfTsgsRp2p95Gci3"
  },
  {
    "id": "drive-11-8p2o_FkGm__msG1DLEW-9Jdi5vnj6l",
    "name": "Abdominal Supra",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Crunch. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11-8p2o_FkGm__msG1DLEW-9Jdi5vnj6l",
    "thumbnail": "https://lh3.googleusercontent.com/d/11-8p2o_FkGm__msG1DLEW-9Jdi5vnj6l",
    "previewUrl": "https://lh3.googleusercontent.com/d/11-8p2o_FkGm__msG1DLEW-9Jdi5vnj6l"
  },
  {
    "id": "drive-16NphCQC5FwhgEifaABtoMKCqmpvO_9Io",
    "name": "Abdominal Supra Declinado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Decline Crunch. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/16NphCQC5FwhgEifaABtoMKCqmpvO_9Io",
    "thumbnail": "https://lh3.googleusercontent.com/d/16NphCQC5FwhgEifaABtoMKCqmpvO_9Io",
    "previewUrl": "https://lh3.googleusercontent.com/d/16NphCQC5FwhgEifaABtoMKCqmpvO_9Io"
  },
  {
    "id": "drive-1RjiEO861Jpe9AJ6GJ3WrhhOUiZezoVLq",
    "name": "Abdominal Completo Declinado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Decline Sit Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RjiEO861Jpe9AJ6GJ3WrhhOUiZezoVLq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RjiEO861Jpe9AJ6GJ3WrhhOUiZezoVLq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RjiEO861Jpe9AJ6GJ3WrhhOUiZezoVLq"
  },
  {
    "id": "drive-1fXf6S398UX1BmipFc3KiBEgOW-MvfYQ5",
    "name": "Dragon Flag",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Dragon Flag. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fXf6S398UX1BmipFc3KiBEgOW-MvfYQ5",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fXf6S398UX1BmipFc3KiBEgOW-MvfYQ5",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fXf6S398UX1BmipFc3KiBEgOW-MvfYQ5"
  },
  {
    "id": "drive-1QYlPqCmnBRwHAUYwVQjR5k8Idu8vSV58",
    "name": "Abdominal Cotovelo no Joelho Alternado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elbow To Knee Sit Up Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QYlPqCmnBRwHAUYwVQjR5k8Idu8vSV58",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QYlPqCmnBRwHAUYwVQjR5k8Idu8vSV58",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QYlPqCmnBRwHAUYwVQjR5k8Idu8vSV58"
  },
  {
    "id": "drive-1qq4isrbeveDsMDUU9cdmhPofxYgKjLgG",
    "name": "Engate Bola",
    "muscleGroup": "Abdômen",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Engate Bola. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qq4isrbeveDsMDUU9cdmhPofxYgKjLgG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qq4isrbeveDsMDUU9cdmhPofxYgKjLgG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qq4isrbeveDsMDUU9cdmhPofxYgKjLgG"
  },
  {
    "id": "drive-1CTY7F24Qhn-u5rX8nGB21RgDYPQZ5KgY",
    "name": "Explosion",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Explosion. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CTY7F24Qhn-u5rX8nGB21RgDYPQZ5KgY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CTY7F24Qhn-u5rX8nGB21RgDYPQZ5KgY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CTY7F24Qhn-u5rX8nGB21RgDYPQZ5KgY"
  },
  {
    "id": "drive-1JjDedGiIwAfr84Ruvy3aKJMKOnX5SrDv",
    "name": "Flexão Extensão Ponte",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Extensão Ponte. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JjDedGiIwAfr84Ruvy3aKJMKOnX5SrDv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JjDedGiIwAfr84Ruvy3aKJMKOnX5SrDv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JjDedGiIwAfr84Ruvy3aKJMKOnX5SrDv"
  },
  {
    "id": "drive-1iFs2wJOIGAtsA_W661fo24zAIaxGacj7",
    "name": "Abdominal Sapo",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Frog Crunch. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iFs2wJOIGAtsA_W661fo24zAIaxGacj7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iFs2wJOIGAtsA_W661fo24zAIaxGacj7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iFs2wJOIGAtsA_W661fo24zAIaxGacj7"
  },
  {
    "id": "drive-1PqbKsO8rg3ZQjk2eswuU9GDAmkab2hSQ",
    "name": "Elevação de Joelhos na Barra Fixa",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Hanging Knee Raises. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PqbKsO8rg3ZQjk2eswuU9GDAmkab2hSQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PqbKsO8rg3ZQjk2eswuU9GDAmkab2hSQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PqbKsO8rg3ZQjk2eswuU9GDAmkab2hSQ"
  },
  {
    "id": "drive-1cpBxfJhv1sB3lKi5ZjbCxgj97FygFlBQ",
    "name": "Hollowhold 360x360",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Hollowhold 360x360. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1cpBxfJhv1sB3lKi5ZjbCxgj97FygFlBQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1cpBxfJhv1sB3lKi5ZjbCxgj97FygFlBQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1cpBxfJhv1sB3lKi5ZjbCxgj97FygFlBQ"
  },
  {
    "id": "drive-1jGmy5cCQh359kCR50mmlTOmO4nWaFiJ1",
    "name": "Infra Banco",
    "muscleGroup": "Abdômen",
    "equipment": "Banco",
    "instructions": "Execução de Infra Banco. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jGmy5cCQh359kCR50mmlTOmO4nWaFiJ1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jGmy5cCQh359kCR50mmlTOmO4nWaFiJ1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jGmy5cCQh359kCR50mmlTOmO4nWaFiJ1"
  },
  {
    "id": "drive-1Rzg50EpAIvF384laBmQGgJhvKVnwAgBB",
    "name": "Infra Maquina",
    "muscleGroup": "Abdômen",
    "equipment": "Máquina",
    "instructions": "Execução de Infra Maquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Rzg50EpAIvF384laBmQGgJhvKVnwAgBB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Rzg50EpAIvF384laBmQGgJhvKVnwAgBB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Rzg50EpAIvF384laBmQGgJhvKVnwAgBB"
  },
  {
    "id": "drive-1Z1WpDWZvzYgzKGED73kjddCUSjwgLxmA",
    "name": "Infra Supra Banco",
    "muscleGroup": "Abdômen",
    "equipment": "Banco",
    "instructions": "Execução de Infra Supra Banco. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Z1WpDWZvzYgzKGED73kjddCUSjwgLxmA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Z1WpDWZvzYgzKGED73kjddCUSjwgLxmA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Z1WpDWZvzYgzKGED73kjddCUSjwgLxmA"
  },
  {
    "id": "drive-1rD2U3wXcA9KW7LLgONPN0vrGBuC5x0Sg",
    "name": "Infra Uni",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Infra Uni. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rD2U3wXcA9KW7LLgONPN0vrGBuC5x0Sg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rD2U3wXcA9KW7LLgONPN0vrGBuC5x0Sg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rD2U3wXcA9KW7LLgONPN0vrGBuC5x0Sg"
  },
  {
    "id": "drive-1UxUuO-OIrtYQzZRCsPIpk1aKClFWIXOW",
    "name": "Abdominal Infra no Banco Inclinado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Infra Up Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UxUuO-OIrtYQzZRCsPIpk1aKClFWIXOW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UxUuO-OIrtYQzZRCsPIpk1aKClFWIXOW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UxUuO-OIrtYQzZRCsPIpk1aKClFWIXOW"
  },
  {
    "id": "drive-13MvfoV8AIHr2T7jULkhjnCckDVDq7xsb",
    "name": "Abdominal Infra Elevado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Infra Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13MvfoV8AIHr2T7jULkhjnCckDVDq7xsb",
    "thumbnail": "https://lh3.googleusercontent.com/d/13MvfoV8AIHr2T7jULkhjnCckDVDq7xsb",
    "previewUrl": "https://lh3.googleusercontent.com/d/13MvfoV8AIHr2T7jULkhjnCckDVDq7xsb"
  },
  {
    "id": "drive-1_CygtA6S3mrnKKe0ZA-i5X8pXN7HBafZ",
    "name": "Infra",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Infra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_CygtA6S3mrnKKe0ZA-i5X8pXN7HBafZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_CygtA6S3mrnKKe0ZA-i5X8pXN7HBafZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_CygtA6S3mrnKKe0ZA-i5X8pXN7HBafZ"
  },
  {
    "id": "drive-1FoLYHiwCwTQJA-jDZQKh7PcI9-SUpN4A",
    "name": "Invertido Bola",
    "muscleGroup": "Abdômen",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Invertido Bola. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FoLYHiwCwTQJA-jDZQKh7PcI9-SUpN4A",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FoLYHiwCwTQJA-jDZQKh7PcI9-SUpN4A",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FoLYHiwCwTQJA-jDZQKh7PcI9-SUpN4A"
  },
  {
    "id": "drive-1iZ7qJHPrfSVdT-U5yzHS0pg2UrlevJgV",
    "name": "Lateralizado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Lateralizado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iZ7qJHPrfSVdT-U5yzHS0pg2UrlevJgV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iZ7qJHPrfSVdT-U5yzHS0pg2UrlevJgV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iZ7qJHPrfSVdT-U5yzHS0pg2UrlevJgV"
  },
  {
    "id": "drive-1ZwxgX87WCpHivv868H2s77nYN-edpcIi",
    "name": "Mergulho Ponte",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Mergulho Ponte. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZwxgX87WCpHivv868H2s77nYN-edpcIi",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZwxgX87WCpHivv868H2s77nYN-edpcIi",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZwxgX87WCpHivv868H2s77nYN-edpcIi"
  },
  {
    "id": "drive-1jQhKyQiZ_vNdg7YWoaZYwklva8IMPCA3",
    "name": "Mergulho Total",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Mergulho Total. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jQhKyQiZ_vNdg7YWoaZYwklva8IMPCA3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jQhKyQiZ_vNdg7YWoaZYwklva8IMPCA3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jQhKyQiZ_vNdg7YWoaZYwklva8IMPCA3"
  },
  {
    "id": "drive-10-GvD2Ph16_OZcl4X_CAdBR5D2yiurks",
    "name": "Mergulho",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Mergulho. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10-GvD2Ph16_OZcl4X_CAdBR5D2yiurks",
    "thumbnail": "https://lh3.googleusercontent.com/d/10-GvD2Ph16_OZcl4X_CAdBR5D2yiurks",
    "previewUrl": "https://lh3.googleusercontent.com/d/10-GvD2Ph16_OZcl4X_CAdBR5D2yiurks"
  },
  {
    "id": "drive-1NBUGMUB6fMI0qD0qTMLHa0gVj_AxXvuO",
    "name": "Oblíquo Alternado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Oblíquo Alternado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NBUGMUB6fMI0qD0qTMLHa0gVj_AxXvuO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NBUGMUB6fMI0qD0qTMLHa0gVj_AxXvuO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NBUGMUB6fMI0qD0qTMLHa0gVj_AxXvuO"
  },
  {
    "id": "drive-1blrxRY6DjFZG675Cbf3eRElkxKK1KP7x",
    "name": "Oblíquo Barra",
    "muscleGroup": "Abdômen",
    "equipment": "Barra",
    "instructions": "Execução de Oblíquo Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1blrxRY6DjFZG675Cbf3eRElkxKK1KP7x",
    "thumbnail": "https://lh3.googleusercontent.com/d/1blrxRY6DjFZG675Cbf3eRElkxKK1KP7x",
    "previewUrl": "https://lh3.googleusercontent.com/d/1blrxRY6DjFZG675Cbf3eRElkxKK1KP7x"
  },
  {
    "id": "drive-1xAV60_5RRi88r6QHsdMFtyzGYyZe3iLU",
    "name": "Oblíquo Bola",
    "muscleGroup": "Abdômen",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Oblíquo Bola. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xAV60_5RRi88r6QHsdMFtyzGYyZe3iLU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xAV60_5RRi88r6QHsdMFtyzGYyZe3iLU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xAV60_5RRi88r6QHsdMFtyzGYyZe3iLU"
  },
  {
    "id": "drive-1vdvZs6AOynJZ5ZKx2AJloFmTBKhLyrIL",
    "name": "Oblíquo em Pé Halter",
    "muscleGroup": "Abdômen",
    "equipment": "Halteres",
    "instructions": "Execução de Oblíquo em Pé Halter. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1vdvZs6AOynJZ5ZKx2AJloFmTBKhLyrIL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1vdvZs6AOynJZ5ZKx2AJloFmTBKhLyrIL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1vdvZs6AOynJZ5ZKx2AJloFmTBKhLyrIL"
  },
  {
    "id": "drive-1qIJIerND2bxaHI5rglmWyAjpmW48edqa",
    "name": "Oblíquo Inclinado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Oblíquo Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qIJIerND2bxaHI5rglmWyAjpmW48edqa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qIJIerND2bxaHI5rglmWyAjpmW48edqa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qIJIerND2bxaHI5rglmWyAjpmW48edqa"
  },
  {
    "id": "drive-1GTMTTwQOVw-XvqnB5sO0cxSvSA7SFtX3",
    "name": "Oblíquo Lateral",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Oblíquo Lateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GTMTTwQOVw-XvqnB5sO0cxSvSA7SFtX3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GTMTTwQOVw-XvqnB5sO0cxSvSA7SFtX3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GTMTTwQOVw-XvqnB5sO0cxSvSA7SFtX3"
  },
  {
    "id": "drive-1Gfsq6BMle7AVLqtIhGzNWNcE4VvBoqg9",
    "name": "Oblíquo Pernas Extendidas",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Oblíquo Pernas Extendidas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Gfsq6BMle7AVLqtIhGzNWNcE4VvBoqg9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Gfsq6BMle7AVLqtIhGzNWNcE4VvBoqg9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Gfsq6BMle7AVLqtIhGzNWNcE4VvBoqg9"
  },
  {
    "id": "drive-1XveJx5mto3Np3EVQlDEh7FQOcC0Nj4yG",
    "name": "Oblíquo Polia Alta",
    "muscleGroup": "Abdômen",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Oblíquo Polia Alta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XveJx5mto3Np3EVQlDEh7FQOcC0Nj4yG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XveJx5mto3Np3EVQlDEh7FQOcC0Nj4yG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XveJx5mto3Np3EVQlDEh7FQOcC0Nj4yG"
  },
  {
    "id": "drive-1iGqogCJ4sDhSXkkj_Dp9v-GhfJDl7c5i",
    "name": "Oblíquo Polia Baixa",
    "muscleGroup": "Abdômen",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Oblíquo Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iGqogCJ4sDhSXkkj_Dp9v-GhfJDl7c5i",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iGqogCJ4sDhSXkkj_Dp9v-GhfJDl7c5i",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iGqogCJ4sDhSXkkj_Dp9v-GhfJDl7c5i"
  },
  {
    "id": "drive-15iA5FVW9Vn83FIXVtggMV-ku5GYenHp2",
    "name": "Oblíquo Sentado",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Oblíquo Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15iA5FVW9Vn83FIXVtggMV-ku5GYenHp2",
    "thumbnail": "https://lh3.googleusercontent.com/d/15iA5FVW9Vn83FIXVtggMV-ku5GYenHp2",
    "previewUrl": "https://lh3.googleusercontent.com/d/15iA5FVW9Vn83FIXVtggMV-ku5GYenHp2"
  },
  {
    "id": "drive-1Bt4rBevfzkACI4Qz6aXyEiBSU-gQKuqW",
    "name": "Oblíquo Toque Lateral",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Oblíquo Toque Lateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Bt4rBevfzkACI4Qz6aXyEiBSU-gQKuqW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Bt4rBevfzkACI4Qz6aXyEiBSU-gQKuqW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Bt4rBevfzkACI4Qz6aXyEiBSU-gQKuqW"
  },
  {
    "id": "drive-1R2pn9a0Uun7KMPsnO-X266R_mpTlqrMY",
    "name": "Oblíquo",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Oblíquo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1R2pn9a0Uun7KMPsnO-X266R_mpTlqrMY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1R2pn9a0Uun7KMPsnO-X266R_mpTlqrMY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1R2pn9a0Uun7KMPsnO-X266R_mpTlqrMY"
  },
  {
    "id": "drive-18nWM1_HvZrYXfZqra4rLjuBHK1iLqieQ",
    "name": "Prancha Abdominal com Carga",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Abdominal com Carga. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18nWM1_HvZrYXfZqra4rLjuBHK1iLqieQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/18nWM1_HvZrYXfZqra4rLjuBHK1iLqieQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/18nWM1_HvZrYXfZqra4rLjuBHK1iLqieQ"
  },
  {
    "id": "drive-1T67eTl3Ca989h_bqmKmXhVRDzkpuxBjo",
    "name": "Prancha Abdominal",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Abdominal. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1T67eTl3Ca989h_bqmKmXhVRDzkpuxBjo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1T67eTl3Ca989h_bqmKmXhVRDzkpuxBjo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1T67eTl3Ca989h_bqmKmXhVRDzkpuxBjo"
  },
  {
    "id": "drive-10QnH9y3EttQT-rhtV64oe2fP4wQdFts3",
    "name": "Prancha Abdominal (Variação 2)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Abdominal (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10QnH9y3EttQT-rhtV64oe2fP4wQdFts3",
    "thumbnail": "https://lh3.googleusercontent.com/d/10QnH9y3EttQT-rhtV64oe2fP4wQdFts3",
    "previewUrl": "https://lh3.googleusercontent.com/d/10QnH9y3EttQT-rhtV64oe2fP4wQdFts3"
  },
  {
    "id": "drive-1KUovOwl1KStlTG-rSaXout3im4T_MD8f",
    "name": "Prancha com Elevação Alternada",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha com Elevação Alternada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1KUovOwl1KStlTG-rSaXout3im4T_MD8f",
    "thumbnail": "https://lh3.googleusercontent.com/d/1KUovOwl1KStlTG-rSaXout3im4T_MD8f",
    "previewUrl": "https://lh3.googleusercontent.com/d/1KUovOwl1KStlTG-rSaXout3im4T_MD8f"
  },
  {
    "id": "drive-1_-pRtQl9Hi3LrnBCouKcsvKw6_4IjGrj",
    "name": "Ponte Cruzada (Core)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Ponte Cruzada (Core). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_-pRtQl9Hi3LrnBCouKcsvKw6_4IjGrj",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_-pRtQl9Hi3LrnBCouKcsvKw6_4IjGrj",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_-pRtQl9Hi3LrnBCouKcsvKw6_4IjGrj"
  },
  {
    "id": "drive-1OeBIAvXO6NP1rdgQmV2JPv6WiygCHNJ2",
    "name": "Prancha Lateral com Flexão de Quadril",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Lateral com Flexão de Quadril. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1OeBIAvXO6NP1rdgQmV2JPv6WiygCHNJ2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1OeBIAvXO6NP1rdgQmV2JPv6WiygCHNJ2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1OeBIAvXO6NP1rdgQmV2JPv6WiygCHNJ2"
  },
  {
    "id": "drive-1Y59YvMA0yKsg9UvsNYYOevO0NInNS4kQ",
    "name": "Ponte Dinâmica (Core)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Ponte Dinâmica (Core). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Y59YvMA0yKsg9UvsNYYOevO0NInNS4kQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Y59YvMA0yKsg9UvsNYYOevO0NInNS4kQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Y59YvMA0yKsg9UvsNYYOevO0NInNS4kQ"
  },
  {
    "id": "drive-1zSSbJRuQso7GHk-ywlOZY0DmS0SKMS13",
    "name": "Ponte de Glúteos / Core",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Ponte de Glúteos / Core. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zSSbJRuQso7GHk-ywlOZY0DmS0SKMS13",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zSSbJRuQso7GHk-ywlOZY0DmS0SKMS13",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zSSbJRuQso7GHk-ywlOZY0DmS0SKMS13"
  },
  {
    "id": "drive-1MGJB6rkNtIaoDj8EIQ2tzV5TBC2qEU_N",
    "name": "Prancha Lateral",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Lateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MGJB6rkNtIaoDj8EIQ2tzV5TBC2qEU_N",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MGJB6rkNtIaoDj8EIQ2tzV5TBC2qEU_N",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MGJB6rkNtIaoDj8EIQ2tzV5TBC2qEU_N"
  },
  {
    "id": "drive-1DaXPfeY9CvGnYozNuQfLQIrySFCz38uo",
    "name": "Prancha Lateral com Variação",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Lateral com Variação. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DaXPfeY9CvGnYozNuQfLQIrySFCz38uo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DaXPfeY9CvGnYozNuQfLQIrySFCz38uo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DaXPfeY9CvGnYozNuQfLQIrySFCz38uo"
  },
  {
    "id": "drive-1zJ6N37AjSQ8RpgbPatPSZhGOtsRNsxLL",
    "name": "Prancha Abdominal Isométrica",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Abdominal Isométrica. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zJ6N37AjSQ8RpgbPatPSZhGOtsRNsxLL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zJ6N37AjSQ8RpgbPatPSZhGOtsRNsxLL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zJ6N37AjSQ8RpgbPatPSZhGOtsRNsxLL"
  },
  {
    "id": "drive-1LUpwsKpB13glAOuvZ2AZFk-V_ZpgTpEp",
    "name": "Prancha Abdominal Clássica",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Abdominal Clássica. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LUpwsKpB13glAOuvZ2AZFk-V_ZpgTpEp",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LUpwsKpB13glAOuvZ2AZFk-V_ZpgTpEp",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LUpwsKpB13glAOuvZ2AZFk-V_ZpgTpEp"
  },
  {
    "id": "drive-1E2a1mGxDDugq6XLMXSNL4vcirD0Wiljy",
    "name": "Push Press (Core e Potência)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Push Press (Core e Potência). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1E2a1mGxDDugq6XLMXSNL4vcirD0Wiljy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1E2a1mGxDDugq6XLMXSNL4vcirD0Wiljy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1E2a1mGxDDugq6XLMXSNL4vcirD0Wiljy"
  },
  {
    "id": "drive-1PD6FrW4k6tInxwWcoKXPGLX4tL08dUre",
    "name": "Abdominal Supra com Pernas Elevadas",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Pernas Elevadas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PD6FrW4k6tInxwWcoKXPGLX4tL08dUre",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PD6FrW4k6tInxwWcoKXPGLX4tL08dUre",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PD6FrW4k6tInxwWcoKXPGLX4tL08dUre"
  },
  {
    "id": "drive-1zQL5f58B08OOkYNIc8QAnkj_NpSNkuox",
    "name": "Abdominal Invertido (Infra)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Invertido (Infra). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zQL5f58B08OOkYNIc8QAnkj_NpSNkuox",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zQL5f58B08OOkYNIc8QAnkj_NpSNkuox",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zQL5f58B08OOkYNIc8QAnkj_NpSNkuox"
  },
  {
    "id": "drive-11oZy6xDEHToQbbyth8xXhi0QxTSx_fbN",
    "name": "Abdominal no Rolinho (Ab Wheel)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal no Rolinho (Ab Wheel). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11oZy6xDEHToQbbyth8xXhi0QxTSx_fbN",
    "thumbnail": "https://lh3.googleusercontent.com/d/11oZy6xDEHToQbbyth8xXhi0QxTSx_fbN",
    "previewUrl": "https://lh3.googleusercontent.com/d/11oZy6xDEHToQbbyth8xXhi0QxTSx_fbN"
  },
  {
    "id": "drive-1O1lqtUxjHh9KBcoVsz2oIaGlghR1QLtx",
    "name": "Abdominal Rollout com Barra (Variação 3)",
    "muscleGroup": "Abdômen",
    "equipment": "Barra",
    "instructions": "Execução de Abdominal Rollout com Barra (Variação 3). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1O1lqtUxjHh9KBcoVsz2oIaGlghR1QLtx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1O1lqtUxjHh9KBcoVsz2oIaGlghR1QLtx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1O1lqtUxjHh9KBcoVsz2oIaGlghR1QLtx"
  },
  {
    "id": "drive-1-wLH0yDKg1bRN84Z0acCW6QpTFv_cAFA",
    "name": "Rotação de Tronco Abdominal",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação de Tronco Abdominal. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-wLH0yDKg1bRN84Z0acCW6QpTFv_cAFA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-wLH0yDKg1bRN84Z0acCW6QpTFv_cAFA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-wLH0yDKg1bRN84Z0acCW6QpTFv_cAFA"
  },
  {
    "id": "drive-1wFW_nJWK63dPSqSUZQMOz4pnNTpD2e31",
    "name": "Abdominal Oblíquo Lateral",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Oblíquo Lateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wFW_nJWK63dPSqSUZQMOz4pnNTpD2e31",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wFW_nJWK63dPSqSUZQMOz4pnNTpD2e31",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wFW_nJWK63dPSqSUZQMOz4pnNTpD2e31"
  },
  {
    "id": "drive-1rpUpzCjFounw-0looS3TQypMrdCJuxgk",
    "name": "Abdominal Rollout na Bola Suíça",
    "muscleGroup": "Abdômen",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Abdominal Rollout na Bola Suíça. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rpUpzCjFounw-0looS3TQypMrdCJuxgk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rpUpzCjFounw-0looS3TQypMrdCJuxgk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rpUpzCjFounw-0looS3TQypMrdCJuxgk"
  },
  {
    "id": "drive-1gZERfkKo7RuPVJJNCN3L-gz6LvrcVYFv",
    "name": "Abdominal Supra em Pé na Polia",
    "muscleGroup": "Abdômen",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Abdominal Supra em Pé na Polia. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gZERfkKo7RuPVJJNCN3L-gz6LvrcVYFv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gZERfkKo7RuPVJJNCN3L-gz6LvrcVYFv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gZERfkKo7RuPVJJNCN3L-gz6LvrcVYFv"
  },
  {
    "id": "drive-1E4iB7Mxm9hUZD-nj7SWOL5C0WB1GtKME",
    "name": "Prancha Straddle (Calistenia)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Prancha Straddle (Calistenia). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1E4iB7Mxm9hUZD-nj7SWOL5C0WB1GtKME",
    "thumbnail": "https://lh3.googleusercontent.com/d/1E4iB7Mxm9hUZD-nj7SWOL5C0WB1GtKME",
    "previewUrl": "https://lh3.googleusercontent.com/d/1E4iB7Mxm9hUZD-nj7SWOL5C0WB1GtKME"
  },
  {
    "id": "drive-19GEM097GPEkElWDpkShiKCEOy3peECH4",
    "name": "Abdominal Supra com Pernas Estendidas",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Pernas Estendidas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19GEM097GPEkElWDpkShiKCEOy3peECH4",
    "thumbnail": "https://lh3.googleusercontent.com/d/19GEM097GPEkElWDpkShiKCEOy3peECH4",
    "previewUrl": "https://lh3.googleusercontent.com/d/19GEM097GPEkElWDpkShiKCEOy3peECH4"
  },
  {
    "id": "drive-1Fsbxzs23gvDPrnbc6J7ViDwP36ljmVmc",
    "name": "Abdominal Superman (Lombar)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Superman (Lombar). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Fsbxzs23gvDPrnbc6J7ViDwP36ljmVmc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Fsbxzs23gvDPrnbc6J7ViDwP36ljmVmc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Fsbxzs23gvDPrnbc6J7ViDwP36ljmVmc"
  },
  {
    "id": "drive-1GIPXN74PFwq2rqAap2bJkvNJnYXyxEpL",
    "name": "Abdominal Supra no Banco",
    "muscleGroup": "Abdômen",
    "equipment": "Banco / Step",
    "instructions": "Execução de Abdominal Supra no Banco. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GIPXN74PFwq2rqAap2bJkvNJnYXyxEpL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GIPXN74PFwq2rqAap2bJkvNJnYXyxEpL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GIPXN74PFwq2rqAap2bJkvNJnYXyxEpL"
  },
  {
    "id": "drive-107xUMhnMSVp5va7g1n225Yr4oSd4fSbw",
    "name": "Abdominal Supra com Carga",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Carga. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/107xUMhnMSVp5va7g1n225Yr4oSd4fSbw",
    "thumbnail": "https://lh3.googleusercontent.com/d/107xUMhnMSVp5va7g1n225Yr4oSd4fSbw",
    "previewUrl": "https://lh3.googleusercontent.com/d/107xUMhnMSVp5va7g1n225Yr4oSd4fSbw"
  },
  {
    "id": "drive-1JvnSM4F072Q5okxrDd_jy745lvvS1nFg",
    "name": "Abdominal Supra com Pernas Elevadas (Variação 2)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Pernas Elevadas (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JvnSM4F072Q5okxrDd_jy745lvvS1nFg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JvnSM4F072Q5okxrDd_jy745lvvS1nFg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JvnSM4F072Q5okxrDd_jy745lvvS1nFg"
  },
  {
    "id": "drive-1T8AIMA1drTLM5AKINifpU1GvK_iysCZA",
    "name": "Abdominal Supra no Aparelho / Encaixe",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra no Aparelho / Encaixe. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1T8AIMA1drTLM5AKINifpU1GvK_iysCZA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1T8AIMA1drTLM5AKINifpU1GvK_iysCZA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1T8AIMA1drTLM5AKINifpU1GvK_iysCZA"
  },
  {
    "id": "drive-15wDohwtYKIhaFtrVrXRQd82BRwhs7HA2",
    "name": "Abdominal Supra com Joelhos Flexionados",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Joelhos Flexionados. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15wDohwtYKIhaFtrVrXRQd82BRwhs7HA2",
    "thumbnail": "https://lh3.googleusercontent.com/d/15wDohwtYKIhaFtrVrXRQd82BRwhs7HA2",
    "previewUrl": "https://lh3.googleusercontent.com/d/15wDohwtYKIhaFtrVrXRQd82BRwhs7HA2"
  },
  {
    "id": "drive-1yCNceUErZuRCU5KQl8LpV9HaAuKzBP-q",
    "name": "Abdominal Supra com Braços Estendidos",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Braços Estendidos. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yCNceUErZuRCU5KQl8LpV9HaAuKzBP-q",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yCNceUErZuRCU5KQl8LpV9HaAuKzBP-q",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yCNceUErZuRCU5KQl8LpV9HaAuKzBP-q"
  },
  {
    "id": "drive-1FhkkTD7HFe8y38NcTnPZ9PziT65uesiZ",
    "name": "Abdominal Supra na Polia Alta",
    "muscleGroup": "Abdômen",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Abdominal Supra na Polia Alta. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FhkkTD7HFe8y38NcTnPZ9PziT65uesiZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FhkkTD7HFe8y38NcTnPZ9PziT65uesiZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FhkkTD7HFe8y38NcTnPZ9PziT65uesiZ"
  },
  {
    "id": "drive-1PIdoVTLYEP4eHYVOKYobcn9XqRzoFtL6",
    "name": "Abdominal Supra Sapo",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra Sapo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PIdoVTLYEP4eHYVOKYobcn9XqRzoFtL6",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PIdoVTLYEP4eHYVOKYobcn9XqRzoFtL6",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PIdoVTLYEP4eHYVOKYobcn9XqRzoFtL6"
  },
  {
    "id": "drive-1td9jK1mQBgs0lV5l9uHpcjPGRMGkAgta",
    "name": "Abdominal Supra Total",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra Total. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1td9jK1mQBgs0lV5l9uHpcjPGRMGkAgta",
    "thumbnail": "https://lh3.googleusercontent.com/d/1td9jK1mQBgs0lV5l9uHpcjPGRMGkAgta",
    "previewUrl": "https://lh3.googleusercontent.com/d/1td9jK1mQBgs0lV5l9uHpcjPGRMGkAgta"
  },
  {
    "id": "drive-1T5kZyVAWZLXL_g3tjfyH-Y6jJhggnpCg",
    "name": "Abdominal Tesoura no Banco Inclinado",
    "muscleGroup": "Abdômen",
    "equipment": "Banco / Step",
    "instructions": "Execução de Abdominal Tesoura no Banco Inclinado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1T5kZyVAWZLXL_g3tjfyH-Y6jJhggnpCg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1T5kZyVAWZLXL_g3tjfyH-Y6jJhggnpCg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1T5kZyVAWZLXL_g3tjfyH-Y6jJhggnpCg"
  },
  {
    "id": "drive-1q9ALiwhwA5UwR9v8VlJ51w8cwQ4-OOSl",
    "name": "Abdominal Tesoura",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Tesoura. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1q9ALiwhwA5UwR9v8VlJ51w8cwQ4-OOSl",
    "thumbnail": "https://lh3.googleusercontent.com/d/1q9ALiwhwA5UwR9v8VlJ51w8cwQ4-OOSl",
    "previewUrl": "https://lh3.googleusercontent.com/d/1q9ALiwhwA5UwR9v8VlJ51w8cwQ4-OOSl"
  },
  {
    "id": "drive-1aDyAoAYW3NNbgGJ1IY0tffcbTgDE_mwv",
    "name": "Abdominal Total na Bola Suíça",
    "muscleGroup": "Abdômen",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Abdominal Total na Bola Suíça. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aDyAoAYW3NNbgGJ1IY0tffcbTgDE_mwv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aDyAoAYW3NNbgGJ1IY0tffcbTgDE_mwv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aDyAoAYW3NNbgGJ1IY0tffcbTgDE_mwv"
  },
  {
    "id": "drive-1VU7ZupA2sPmg-edyn70J8RI1wlyysdwk",
    "name": "Abdominal Total na Polia Baixa",
    "muscleGroup": "Abdômen",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Abdominal Total na Polia Baixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VU7ZupA2sPmg-edyn70J8RI1wlyysdwk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VU7ZupA2sPmg-edyn70J8RI1wlyysdwk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VU7ZupA2sPmg-edyn70J8RI1wlyysdwk"
  },
  {
    "id": "drive-1RJ7-5fPLGUH84a80i5V0lL11AHqH7ilB",
    "name": "Abdominal Canivete em V",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Canivete em V. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RJ7-5fPLGUH84a80i5V0lL11AHqH7ilB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RJ7-5fPLGUH84a80i5V0lL11AHqH7ilB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RJ7-5fPLGUH84a80i5V0lL11AHqH7ilB"
  },
  {
    "id": "drive-1zHs56OnGvygjXDF5E4-G_MrYTXTf2tu7",
    "name": "Abdominal Supra com Pés na Parede",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Pés na Parede. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zHs56OnGvygjXDF5E4-G_MrYTXTf2tu7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zHs56OnGvygjXDF5E4-G_MrYTXTf2tu7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zHs56OnGvygjXDF5E4-G_MrYTXTf2tu7"
  },
  {
    "id": "drive-1-0x_SKIvXRYCBtWma-5GqjCIZSkHaCXC",
    "name": "Abdominal Supra com Carga (Anilha)",
    "muscleGroup": "Abdômen",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Abdominal Supra com Carga (Anilha). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-0x_SKIvXRYCBtWma-5GqjCIZSkHaCXC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-0x_SKIvXRYCBtWma-5GqjCIZSkHaCXC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-0x_SKIvXRYCBtWma-5GqjCIZSkHaCXC"
  },
  {
    "id": "drive-17MrGfnnpxRQ_jgNq5INB72nBlFFsVbqf",
    "name": "Rosca Inversa com Barra",
    "muscleGroup": "Antebraço",
    "equipment": "Barra",
    "instructions": "Execução de Rosca Inversa com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17MrGfnnpxRQ_jgNq5INB72nBlFFsVbqf",
    "thumbnail": "https://lh3.googleusercontent.com/d/17MrGfnnpxRQ_jgNq5INB72nBlFFsVbqf",
    "previewUrl": "https://lh3.googleusercontent.com/d/17MrGfnnpxRQ_jgNq5INB72nBlFFsVbqf"
  },
  {
    "id": "drive-1VX8h6-uTHhmalpeuczR-9Yg1XvUl22Am",
    "name": "Rosca de Punho Neutra",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca de Punho Neutra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VX8h6-uTHhmalpeuczR-9Yg1XvUl22Am",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VX8h6-uTHhmalpeuczR-9Yg1XvUl22Am",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VX8h6-uTHhmalpeuczR-9Yg1XvUl22Am"
  },
  {
    "id": "drive-11H-yyQQs6Wkv9Bwqjlc-Y_gSU52j8hSB",
    "name": "Rosca de Punho com Barra",
    "muscleGroup": "Antebraço",
    "equipment": "Barra",
    "instructions": "Execução de Rosca de Punho com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11H-yyQQs6Wkv9Bwqjlc-Y_gSU52j8hSB",
    "thumbnail": "https://lh3.googleusercontent.com/d/11H-yyQQs6Wkv9Bwqjlc-Y_gSU52j8hSB",
    "previewUrl": "https://lh3.googleusercontent.com/d/11H-yyQQs6Wkv9Bwqjlc-Y_gSU52j8hSB"
  },
  {
    "id": "drive-1tKbx6ZxvdaiJVey7zXjHi_O-PBsaDn3s",
    "name": "Rosca de Punho Invertida",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca de Punho Invertida. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1tKbx6ZxvdaiJVey7zXjHi_O-PBsaDn3s",
    "thumbnail": "https://lh3.googleusercontent.com/d/1tKbx6ZxvdaiJVey7zXjHi_O-PBsaDn3s",
    "previewUrl": "https://lh3.googleusercontent.com/d/1tKbx6ZxvdaiJVey7zXjHi_O-PBsaDn3s"
  },
  {
    "id": "drive-1HgibM8Fr2PS4UNtW-5mC-IGllm0Ms8Ot",
    "name": "Rosca Inversa com Halteres",
    "muscleGroup": "Antebraço",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Reverse Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HgibM8Fr2PS4UNtW-5mC-IGllm0Ms8Ot",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HgibM8Fr2PS4UNtW-5mC-IGllm0Ms8Ot",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HgibM8Fr2PS4UNtW-5mC-IGllm0Ms8Ot"
  },
  {
    "id": "drive-1TK4CcINVxhpKnUftExGNvIC5Bm_5bQo7",
    "name": "Rosca Punho Inversa com Halteres",
    "muscleGroup": "Antebraço",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Reverse Wrist Rosca Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TK4CcINVxhpKnUftExGNvIC5Bm_5bQo7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TK4CcINVxhpKnUftExGNvIC5Bm_5bQo7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TK4CcINVxhpKnUftExGNvIC5Bm_5bQo7"
  },
  {
    "id": "drive-1kBoZc2WDWZOhT52Xho7reHeFi-KcNCe4",
    "name": "Rosca Punho com Halteres",
    "muscleGroup": "Antebraço",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Wrist Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kBoZc2WDWZOhT52Xho7reHeFi-KcNCe4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kBoZc2WDWZOhT52Xho7reHeFi-KcNCe4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kBoZc2WDWZOhT52Xho7reHeFi-KcNCe4"
  },
  {
    "id": "drive-1U9NgMC5FK3yKGLEe3CFo5CY9xr2X4nkz",
    "name": "Preensão Manual (Hand Grip)",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Hand Grip. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1U9NgMC5FK3yKGLEe3CFo5CY9xr2X4nkz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1U9NgMC5FK3yKGLEe3CFo5CY9xr2X4nkz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1U9NgMC5FK3yKGLEe3CFo5CY9xr2X4nkz"
  },
  {
    "id": "drive-1iCh2kFu9V1rwN4i7pAoNTeZgHo3SP3ql",
    "name": "Punho Reverso",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Punho Reverso. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iCh2kFu9V1rwN4i7pAoNTeZgHo3SP3ql",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iCh2kFu9V1rwN4i7pAoNTeZgHo3SP3ql",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iCh2kFu9V1rwN4i7pAoNTeZgHo3SP3ql"
  },
  {
    "id": "drive-1dgFUBbE-QVDAXXyvc9GhJ4PMTvuIfdvn",
    "name": "Rolo de Punho",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rolo de Punho. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dgFUBbE-QVDAXXyvc9GhJ4PMTvuIfdvn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dgFUBbE-QVDAXXyvc9GhJ4PMTvuIfdvn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dgFUBbE-QVDAXXyvc9GhJ4PMTvuIfdvn"
  },
  {
    "id": "drive-1I01ac_UkSVrb5XWV9JG-aOCBDlQyIYk7",
    "name": "Rosca de Dedo com Barra",
    "muscleGroup": "Antebraço",
    "equipment": "Barra",
    "instructions": "Execução de Rosca de Dedo com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I01ac_UkSVrb5XWV9JG-aOCBDlQyIYk7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I01ac_UkSVrb5XWV9JG-aOCBDlQyIYk7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I01ac_UkSVrb5XWV9JG-aOCBDlQyIYk7"
  },
  {
    "id": "drive-1yWxpC6rCHDEGKmsCaNtOWYtBuSEfCmJd",
    "name": "Rosca de Punho com Halter",
    "muscleGroup": "Antebraço",
    "equipment": "Halteres",
    "instructions": "Execução de Rosca de Punho com Halter. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yWxpC6rCHDEGKmsCaNtOWYtBuSEfCmJd",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yWxpC6rCHDEGKmsCaNtOWYtBuSEfCmJd",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yWxpC6rCHDEGKmsCaNtOWYtBuSEfCmJd"
  },
  {
    "id": "drive-1zGcLN8CI6Czgo_M2H89mg7iNZiMEkWoK",
    "name": "Rosca de Punho Neutra (Variação 2)",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca de Punho Neutra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zGcLN8CI6Czgo_M2H89mg7iNZiMEkWoK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zGcLN8CI6Czgo_M2H89mg7iNZiMEkWoK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zGcLN8CI6Czgo_M2H89mg7iNZiMEkWoK"
  },
  {
    "id": "drive-1RhNxEak7ht8nHh6951ZHlmBM_QMO87KH",
    "name": "Rosca de Punho Por Trás",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca de Punho Por Trás. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RhNxEak7ht8nHh6951ZHlmBM_QMO87KH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RhNxEak7ht8nHh6951ZHlmBM_QMO87KH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RhNxEak7ht8nHh6951ZHlmBM_QMO87KH"
  },
  {
    "id": "drive-1h2g6CM3Po-yMddnSqJ2NC6b8fhKbziOv",
    "name": "Rosca de Punho Reversa Apoiado",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca de Punho Reversa Apoiado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1h2g6CM3Po-yMddnSqJ2NC6b8fhKbziOv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1h2g6CM3Po-yMddnSqJ2NC6b8fhKbziOv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1h2g6CM3Po-yMddnSqJ2NC6b8fhKbziOv"
  },
  {
    "id": "drive-1doOIN948yJYKjkDdYUTx9Ssjh7Yq7GhZ",
    "name": "Rosca de Punho Reversa com Barra",
    "muscleGroup": "Antebraço",
    "equipment": "Barra",
    "instructions": "Execução de Rosca de Punho Reversa com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1doOIN948yJYKjkDdYUTx9Ssjh7Yq7GhZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1doOIN948yJYKjkDdYUTx9Ssjh7Yq7GhZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1doOIN948yJYKjkDdYUTx9Ssjh7Yq7GhZ"
  },
  {
    "id": "drive-1CW7TU0hJq2CqGEGHbgtCaMRpXdeq8VF0",
    "name": "Rosca Reversa com Barra",
    "muscleGroup": "Antebraço",
    "equipment": "Barra",
    "instructions": "Execução de Rosca Reversa com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CW7TU0hJq2CqGEGHbgtCaMRpXdeq8VF0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CW7TU0hJq2CqGEGHbgtCaMRpXdeq8VF0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CW7TU0hJq2CqGEGHbgtCaMRpXdeq8VF0"
  },
  {
    "id": "drive-18w5PnO1D41-bMNIGSAjE5vvAeqrmghaL",
    "name": "Círculos / Mobilidade de Punho",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Wrist Circles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18w5PnO1D41-bMNIGSAjE5vvAeqrmghaL",
    "thumbnail": "https://lh3.googleusercontent.com/d/18w5PnO1D41-bMNIGSAjE5vvAeqrmghaL",
    "previewUrl": "https://lh3.googleusercontent.com/d/18w5PnO1D41-bMNIGSAjE5vvAeqrmghaL"
  },
  {
    "id": "drive-1oMqxUF3bMJnYyvaTzlf7hQw1PmiiclBn",
    "name": "Flexão de Punho",
    "muscleGroup": "Antebraço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Wrist Flexion. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1oMqxUF3bMJnYyvaTzlf7hQw1PmiiclBn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1oMqxUF3bMJnYyvaTzlf7hQw1PmiiclBn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1oMqxUF3bMJnYyvaTzlf7hQw1PmiiclBn"
  },
  {
    "id": "drive-1Og7q5rmrhBEXp30XN4jrAzCyS8Yu5fhI",
    "name": "Alternada no Scott",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alternada no Scott. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Og7q5rmrhBEXp30XN4jrAzCyS8Yu5fhI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Og7q5rmrhBEXp30XN4jrAzCyS8Yu5fhI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Og7q5rmrhBEXp30XN4jrAzCyS8Yu5fhI"
  },
  {
    "id": "drive-1WD1xlM25nqKQi3OUrH4LGl_R1GrE8vrX",
    "name": "Rosca Martelo Alternada",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Martelo Alternada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WD1xlM25nqKQi3OUrH4LGl_R1GrE8vrX",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WD1xlM25nqKQi3OUrH4LGl_R1GrE8vrX",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WD1xlM25nqKQi3OUrH4LGl_R1GrE8vrX"
  },
  {
    "id": "drive-1da2m3mGd3lx_0XEEIGkoUml1vYyRtCfd",
    "name": "Rosca no Arm Blaster",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca no Arm Blaster. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1da2m3mGd3lx_0XEEIGkoUml1vYyRtCfd",
    "thumbnail": "https://lh3.googleusercontent.com/d/1da2m3mGd3lx_0XEEIGkoUml1vYyRtCfd",
    "previewUrl": "https://lh3.googleusercontent.com/d/1da2m3mGd3lx_0XEEIGkoUml1vYyRtCfd"
  },
  {
    "id": "drive-1zKsr6BceOdJaghySRrYiBRnMpwqBXu4e",
    "name": "Rosca com Barra (roubada)",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Rosca com Barra (roubada). Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zKsr6BceOdJaghySRrYiBRnMpwqBXu4e",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zKsr6BceOdJaghySRrYiBRnMpwqBXu4e",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zKsr6BceOdJaghySRrYiBRnMpwqBXu4e"
  },
  {
    "id": "drive-1kyLyP35D-0LxiiDHoI88dk7meH29-neP",
    "name": "Rosca Direta com Barra",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Barra Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kyLyP35D-0LxiiDHoI88dk7meH29-neP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kyLyP35D-0LxiiDHoI88dk7meH29-neP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kyLyP35D-0LxiiDHoI88dk7meH29-neP"
  },
  {
    "id": "drive-1s1gAg5dqaNt4ptVpuxdMt3m8XApMC_cm",
    "name": "Rosca Scott com Barra",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Barra Preacher Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1s1gAg5dqaNt4ptVpuxdMt3m8XApMC_cm",
    "thumbnail": "https://lh3.googleusercontent.com/d/1s1gAg5dqaNt4ptVpuxdMt3m8XApMC_cm",
    "previewUrl": "https://lh3.googleusercontent.com/d/1s1gAg5dqaNt4ptVpuxdMt3m8XApMC_cm"
  },
  {
    "id": "drive-1Hz3m7CwCbYJp0HLtum0a3eT52NR8cgeO",
    "name": "Rosca Bayesiana na Polia",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Bayesian Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Hz3m7CwCbYJp0HLtum0a3eT52NR8cgeO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Hz3m7CwCbYJp0HLtum0a3eT52NR8cgeO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Hz3m7CwCbYJp0HLtum0a3eT52NR8cgeO"
  },
  {
    "id": "drive-1wLuwO8eWJoudSaxHsJ9fpQQ-Y6garlQf",
    "name": "Rosca Bíceps na Máquina",
    "muscleGroup": "Bíceps",
    "equipment": "Máquina",
    "instructions": "Execução de Bicep Rosca Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wLuwO8eWJoudSaxHsJ9fpQQ-Y6garlQf",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wLuwO8eWJoudSaxHsJ9fpQQ-Y6garlQf",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wLuwO8eWJoudSaxHsJ9fpQQ-Y6garlQf"
  },
  {
    "id": "drive-1KaTMxhRRmjasXAIxnRCCdcXuQ5-fDULG",
    "name": "Bíceps Apoiado Polia Baixa",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Bíceps Apoiado Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1KaTMxhRRmjasXAIxnRCCdcXuQ5-fDULG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1KaTMxhRRmjasXAIxnRCCdcXuQ5-fDULG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1KaTMxhRRmjasXAIxnRCCdcXuQ5-fDULG"
  },
  {
    "id": "drive-1_hDNVF6OpUG57Fs-yt7y6-Xd25TJbuiW",
    "name": "Bíceps Corda",
    "muscleGroup": "Bíceps",
    "equipment": "Corda Naval",
    "instructions": "Execução de Bíceps Corda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_hDNVF6OpUG57Fs-yt7y6-Xd25TJbuiW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_hDNVF6OpUG57Fs-yt7y6-Xd25TJbuiW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_hDNVF6OpUG57Fs-yt7y6-Xd25TJbuiW"
  },
  {
    "id": "drive-1Jy7q8ajJ7qciM7wcY4gG2iLCwmG_flpQ",
    "name": "Bíceps Inclinad0 Crossover",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Bíceps Inclinad0 Crossover. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Jy7q8ajJ7qciM7wcY4gG2iLCwmG_flpQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Jy7q8ajJ7qciM7wcY4gG2iLCwmG_flpQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Jy7q8ajJ7qciM7wcY4gG2iLCwmG_flpQ"
  },
  {
    "id": "drive-1PjElzJ9cmfY8jOZd56kdYR_F_7VM-wI8",
    "name": "Bíceps Inclinado Polia Baixa",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Bíceps Inclinado Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PjElzJ9cmfY8jOZd56kdYR_F_7VM-wI8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PjElzJ9cmfY8jOZd56kdYR_F_7VM-wI8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PjElzJ9cmfY8jOZd56kdYR_F_7VM-wI8"
  },
  {
    "id": "drive-1-J1-7aoJR4KMP8wbid6IASNBemmAL4VO",
    "name": "Bíceps na Máquina",
    "muscleGroup": "Bíceps",
    "equipment": "Máquina",
    "instructions": "Execução de Bíceps na Máquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-J1-7aoJR4KMP8wbid6IASNBemmAL4VO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-J1-7aoJR4KMP8wbid6IASNBemmAL4VO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-J1-7aoJR4KMP8wbid6IASNBemmAL4VO"
  },
  {
    "id": "drive-1KL69NU4bO4NiKPdyLyAVXWeHsntgBevu",
    "name": "Bíceps Polia Alta Unilateral",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Bíceps Polia Alta Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1KL69NU4bO4NiKPdyLyAVXWeHsntgBevu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1KL69NU4bO4NiKPdyLyAVXWeHsntgBevu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1KL69NU4bO4NiKPdyLyAVXWeHsntgBevu"
  },
  {
    "id": "drive-1kzfFzenNLYEzxEfw_UUxULnH349ta8EI",
    "name": "Bíceps Polia Alta",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Bíceps Polia Alta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kzfFzenNLYEzxEfw_UUxULnH349ta8EI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kzfFzenNLYEzxEfw_UUxULnH349ta8EI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kzfFzenNLYEzxEfw_UUxULnH349ta8EI"
  },
  {
    "id": "drive-1io21ixJzSZeWMKU7ELR9lQ19Hf-tLqjE",
    "name": "Bíceps Polia Baixa",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Bíceps Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1io21ixJzSZeWMKU7ELR9lQ19Hf-tLqjE",
    "thumbnail": "https://lh3.googleusercontent.com/d/1io21ixJzSZeWMKU7ELR9lQ19Hf-tLqjE",
    "previewUrl": "https://lh3.googleusercontent.com/d/1io21ixJzSZeWMKU7ELR9lQ19Hf-tLqjE"
  },
  {
    "id": "drive-1ejWjjA8aC4mnmkHJb8wVlqngRctbBwmp",
    "name": "Rosca Bíceps na Polia",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Bicep Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ejWjjA8aC4mnmkHJb8wVlqngRctbBwmp",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ejWjjA8aC4mnmkHJb8wVlqngRctbBwmp",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ejWjjA8aC4mnmkHJb8wVlqngRctbBwmp"
  },
  {
    "id": "drive-1I1J1ArMazb8eAG3cz7NIcnGDB7hV7AEI",
    "name": "Rosca Unilateral na Polia",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia One Arm Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I1J1ArMazb8eAG3cz7NIcnGDB7hV7AEI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I1J1ArMazb8eAG3cz7NIcnGDB7hV7AEI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I1J1ArMazb8eAG3cz7NIcnGDB7hV7AEI"
  },
  {
    "id": "drive-11_XZred9Zns60hhYWx80BFn9u2cRxzmL",
    "name": "Rosca Scott na Polia",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Preacher Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11_XZred9Zns60hhYWx80BFn9u2cRxzmL",
    "thumbnail": "https://lh3.googleusercontent.com/d/11_XZred9Zns60hhYWx80BFn9u2cRxzmL",
    "previewUrl": "https://lh3.googleusercontent.com/d/11_XZred9Zns60hhYWx80BFn9u2cRxzmL"
  },
  {
    "id": "drive-1I4Mw79WrQpzJPhpDvbpwUzQaAel8Bb6U",
    "name": "Rosca Martelo Unilateral na Polia",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Single Arm Hammer Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I4Mw79WrQpzJPhpDvbpwUzQaAel8Bb6U",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I4Mw79WrQpzJPhpDvbpwUzQaAel8Bb6U",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I4Mw79WrQpzJPhpDvbpwUzQaAel8Bb6U"
  },
  {
    "id": "drive-1RjWVntm-u-K6nVRfnbDG-SDn8MFTNHW9",
    "name": "Remada Supinada na Polia",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Underhand Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RjWVntm-u-K6nVRfnbDG-SDn8MFTNHW9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RjWVntm-u-K6nVRfnbDG-SDn8MFTNHW9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RjWVntm-u-K6nVRfnbDG-SDn8MFTNHW9"
  },
  {
    "id": "drive-1Bg6BSxngrPpTvLJFQ0I8reNRpQE4pEly",
    "name": "Rosca Direta Pegada Fechada com Barra",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Close Grip Barra Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Bg6BSxngrPpTvLJFQ0I8reNRpQE4pEly",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Bg6BSxngrPpTvLJFQ0I8reNRpQE4pEly",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Bg6BSxngrPpTvLJFQ0I8reNRpQE4pEly"
  },
  {
    "id": "drive-1QFKjPhrvAYGkCAzL_pSOiSRzpoPd_s1a",
    "name": "Rosca Martelo Cruzada com Halteres",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Cross Body Hammer Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QFKjPhrvAYGkCAzL_pSOiSRzpoPd_s1a",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QFKjPhrvAYGkCAzL_pSOiSRzpoPd_s1a",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QFKjPhrvAYGkCAzL_pSOiSRzpoPd_s1a"
  },
  {
    "id": "drive-1CdMqEIo_g2K2gc6ZEjEi00vF44svzRY2",
    "name": "Rosca Bíceps com Halteres",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Bicep Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CdMqEIo_g2K2gc6ZEjEi00vF44svzRY2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CdMqEIo_g2K2gc6ZEjEi00vF44svzRY2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CdMqEIo_g2K2gc6ZEjEi00vF44svzRY2"
  },
  {
    "id": "drive-1MT9lGIzw8tVswjo3uD2_nd57ClrgRi0N",
    "name": "Rosca Concentrada com Haltere",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Concentration Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MT9lGIzw8tVswjo3uD2_nd57ClrgRi0N",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MT9lGIzw8tVswjo3uD2_nd57ClrgRi0N",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MT9lGIzw8tVswjo3uD2_nd57ClrgRi0N"
  },
  {
    "id": "drive-1mhUn-rGG_ZtvOz8kDsT5ydwfige2miwf",
    "name": "Rosca Martelo com Halteres",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Hammer Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mhUn-rGG_ZtvOz8kDsT5ydwfige2miwf",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mhUn-rGG_ZtvOz8kDsT5ydwfige2miwf",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mhUn-rGG_ZtvOz8kDsT5ydwfige2miwf"
  },
  {
    "id": "drive-12o3llRXJiLixjn6hgS1_6Y2JNefpOF_v",
    "name": "Rosca Martelo no Banco Inclinado",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Incline Hammer Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12o3llRXJiLixjn6hgS1_6Y2JNefpOF_v",
    "thumbnail": "https://lh3.googleusercontent.com/d/12o3llRXJiLixjn6hgS1_6Y2JNefpOF_v",
    "previewUrl": "https://lh3.googleusercontent.com/d/12o3llRXJiLixjn6hgS1_6Y2JNefpOF_v"
  },
  {
    "id": "drive-12ZlCqAu-1v5wxGV2l9ZpXrpTa_5A5nhk",
    "name": "Rosca Scott com Haltere",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Preacher Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12ZlCqAu-1v5wxGV2l9ZpXrpTa_5A5nhk",
    "thumbnail": "https://lh3.googleusercontent.com/d/12ZlCqAu-1v5wxGV2l9ZpXrpTa_5A5nhk",
    "previewUrl": "https://lh3.googleusercontent.com/d/12ZlCqAu-1v5wxGV2l9ZpXrpTa_5A5nhk"
  },
  {
    "id": "drive-1Yo6J9iPV_hctAafeS6mB8ohmpJPaVgZx",
    "name": "Rosca Martelo no Banco Scott",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Preacher Hammer Roscas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Yo6J9iPV_hctAafeS6mB8ohmpJPaVgZx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Yo6J9iPV_hctAafeS6mB8ohmpJPaVgZx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Yo6J9iPV_hctAafeS6mB8ohmpJPaVgZx"
  },
  {
    "id": "drive-18whJC08Y1sDS9RaN9lFEmRzUq_4CURNk",
    "name": "Rosca Zottman Sentado com Halteres",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Seated Zottman Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18whJC08Y1sDS9RaN9lFEmRzUq_4CURNk",
    "thumbnail": "https://lh3.googleusercontent.com/d/18whJC08Y1sDS9RaN9lFEmRzUq_4CURNk",
    "previewUrl": "https://lh3.googleusercontent.com/d/18whJC08Y1sDS9RaN9lFEmRzUq_4CURNk"
  },
  {
    "id": "drive-1N9cPIkyPeYd1CivzrZ0zcu5uL5xeWnJj",
    "name": "Rosca Direta com Barra W",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Ez Bar Bicep Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1N9cPIkyPeYd1CivzrZ0zcu5uL5xeWnJj",
    "thumbnail": "https://lh3.googleusercontent.com/d/1N9cPIkyPeYd1CivzrZ0zcu5uL5xeWnJj",
    "previewUrl": "https://lh3.googleusercontent.com/d/1N9cPIkyPeYd1CivzrZ0zcu5uL5xeWnJj"
  },
  {
    "id": "drive-1gAXN9TjKfRYA3pxQyYA6dwKf-ILL-SH7",
    "name": "Rosca Scott com Barra W",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Ez Bar Preacher Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gAXN9TjKfRYA3pxQyYA6dwKf-ILL-SH7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gAXN9TjKfRYA3pxQyYA6dwKf-ILL-SH7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gAXN9TjKfRYA3pxQyYA6dwKf-ILL-SH7"
  },
  {
    "id": "drive-1Q9tGutyTOGufzzg_v4P9OyKLsMIpqAM0",
    "name": "Rosca Direta no Banco Inclinado com Halteres",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Incline Halter Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Q9tGutyTOGufzzg_v4P9OyKLsMIpqAM0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Q9tGutyTOGufzzg_v4P9OyKLsMIpqAM0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Q9tGutyTOGufzzg_v4P9OyKLsMIpqAM0"
  },
  {
    "id": "drive-1dy2t3k1NK0PJv3ri0SQ-8vzEQ6M9PV6a",
    "name": "Rosca Bíceps Lateral na Polia Alta",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Lateral Bicep Roscas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dy2t3k1NK0PJv3ri0SQ-8vzEQ6M9PV6a",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dy2t3k1NK0PJv3ri0SQ-8vzEQ6M9PV6a",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dy2t3k1NK0PJv3ri0SQ-8vzEQ6M9PV6a"
  },
  {
    "id": "drive-1npJkMtyx5fTbXicflhCRKff_3y8H71DL",
    "name": "Martelo no Scott",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Martelo no Scott. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1npJkMtyx5fTbXicflhCRKff_3y8H71DL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1npJkMtyx5fTbXicflhCRKff_3y8H71DL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1npJkMtyx5fTbXicflhCRKff_3y8H71DL"
  },
  {
    "id": "drive-1uv1hLuCisXc7zLuhgxGAOuciA78Tjr-y",
    "name": "Martelo Scott",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Martelo Scott. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1uv1hLuCisXc7zLuhgxGAOuciA78Tjr-y",
    "thumbnail": "https://lh3.googleusercontent.com/d/1uv1hLuCisXc7zLuhgxGAOuciA78Tjr-y",
    "previewUrl": "https://lh3.googleusercontent.com/d/1uv1hLuCisXc7zLuhgxGAOuciA78Tjr-y"
  },
  {
    "id": "drive-1jteV_PLD1zhmpzWJiatjtyI2V-Z3L9_5",
    "name": "Rosca Bíceps na Polia Alta (Duplo Bíceps)",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Overhead Cabo / Polia Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jteV_PLD1zhmpzWJiatjtyI2V-Z3L9_5",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jteV_PLD1zhmpzWJiatjtyI2V-Z3L9_5",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jteV_PLD1zhmpzWJiatjtyI2V-Z3L9_5"
  },
  {
    "id": "drive-1RXIE4cEpdMLAj4IqAZwkdZlD-A-LdIKC",
    "name": "Rosca Bíceps Pronado no Banco Inclinado",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Prone Incline Halter Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RXIE4cEpdMLAj4IqAZwkdZlD-A-LdIKC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RXIE4cEpdMLAj4IqAZwkdZlD-A-LdIKC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RXIE4cEpdMLAj4IqAZwkdZlD-A-LdIKC"
  },
  {
    "id": "drive-1YRU-Q26tsw1Spq8K-QNv5l7wn9rZc36a",
    "name": "Rosca 2 Tempos",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca 2 Tempos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YRU-Q26tsw1Spq8K-QNv5l7wn9rZc36a",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YRU-Q26tsw1Spq8K-QNv5l7wn9rZc36a",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YRU-Q26tsw1Spq8K-QNv5l7wn9rZc36a"
  },
  {
    "id": "drive-1Hy1igNnGAqk-H7T8wnMfRKyPxHpVHNHM",
    "name": "Rosca Aberta",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Aberta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Hy1igNnGAqk-H7T8wnMfRKyPxHpVHNHM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Hy1igNnGAqk-H7T8wnMfRKyPxHpVHNHM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Hy1igNnGAqk-H7T8wnMfRKyPxHpVHNHM"
  },
  {
    "id": "drive-14s6MeB65IGlgYXsbwAKmTkTHO-MrIqb4",
    "name": "Rosca Alternada",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Alternada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14s6MeB65IGlgYXsbwAKmTkTHO-MrIqb4",
    "thumbnail": "https://lh3.googleusercontent.com/d/14s6MeB65IGlgYXsbwAKmTkTHO-MrIqb4",
    "previewUrl": "https://lh3.googleusercontent.com/d/14s6MeB65IGlgYXsbwAKmTkTHO-MrIqb4"
  },
  {
    "id": "drive-1kv-7wCvJF4Q72qrmqGbE24JOnZES3M9H",
    "name": "Rosca Alternado Inclinado",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Alternado Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kv-7wCvJF4Q72qrmqGbE24JOnZES3M9H",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kv-7wCvJF4Q72qrmqGbE24JOnZES3M9H",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kv-7wCvJF4Q72qrmqGbE24JOnZES3M9H"
  },
  {
    "id": "drive-1s4ntghoZvHVrKxtp-58hdVASq4oVqIB7",
    "name": "Rosca Apoiada Inclinada",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Apoiada Inclinada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1s4ntghoZvHVrKxtp-58hdVASq4oVqIB7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1s4ntghoZvHVrKxtp-58hdVASq4oVqIB7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1s4ntghoZvHVrKxtp-58hdVASq4oVqIB7"
  },
  {
    "id": "drive-11Izq2FCZvoXPQ6CBnAJVameo2K2xce9F",
    "name": "Rosca com Rotação Sentado",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca com Rotação Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11Izq2FCZvoXPQ6CBnAJVameo2K2xce9F",
    "thumbnail": "https://lh3.googleusercontent.com/d/11Izq2FCZvoXPQ6CBnAJVameo2K2xce9F",
    "previewUrl": "https://lh3.googleusercontent.com/d/11Izq2FCZvoXPQ6CBnAJVameo2K2xce9F"
  },
  {
    "id": "drive-1oL7QrIfiop8A8XyCVIMF2GFPFiPUsIJV",
    "name": "Rosca Concentrada",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Concentrada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1oL7QrIfiop8A8XyCVIMF2GFPFiPUsIJV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1oL7QrIfiop8A8XyCVIMF2GFPFiPUsIJV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1oL7QrIfiop8A8XyCVIMF2GFPFiPUsIJV"
  },
  {
    "id": "drive-1ed9zCse5wJgVVq9AmIwIX0mA0hDZWITM",
    "name": "Rosca Direta Aberta",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Direta Aberta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ed9zCse5wJgVVq9AmIwIX0mA0hDZWITM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ed9zCse5wJgVVq9AmIwIX0mA0hDZWITM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ed9zCse5wJgVVq9AmIwIX0mA0hDZWITM"
  },
  {
    "id": "drive-1JzmeZ9lWG1xiLWjn1b0lhuVqcS4gQ6tg",
    "name": "Rosca Direta Barra Média",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Rosca Direta Barra Média. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JzmeZ9lWG1xiLWjn1b0lhuVqcS4gQ6tg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JzmeZ9lWG1xiLWjn1b0lhuVqcS4gQ6tg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JzmeZ9lWG1xiLWjn1b0lhuVqcS4gQ6tg"
  },
  {
    "id": "drive-1MpCDzweClGoOB8eKRjgBUI0qEWNWb_0j",
    "name": "Rosca Direta Deitado",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Rosca Direta Deitado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MpCDzweClGoOB8eKRjgBUI0qEWNWb_0j",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MpCDzweClGoOB8eKRjgBUI0qEWNWb_0j",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MpCDzweClGoOB8eKRjgBUI0qEWNWb_0j"
  },
  {
    "id": "drive-1W2buojlSvFpnPMwW3mMZKrPS01SZD-Nk",
    "name": "Rosca Direta Inclinada com Barra",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Rosca Direta Inclinada com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1W2buojlSvFpnPMwW3mMZKrPS01SZD-Nk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1W2buojlSvFpnPMwW3mMZKrPS01SZD-Nk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1W2buojlSvFpnPMwW3mMZKrPS01SZD-Nk"
  },
  {
    "id": "drive-14ZSr_BUWyVyGHCOJ9Ax6anCr-TcsDgRZ",
    "name": "Rosca Direta na Barra",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Rosca Direta na Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14ZSr_BUWyVyGHCOJ9Ax6anCr-TcsDgRZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/14ZSr_BUWyVyGHCOJ9Ax6anCr-TcsDgRZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/14ZSr_BUWyVyGHCOJ9Ax6anCr-TcsDgRZ"
  },
  {
    "id": "drive-192tc4Q5_lz736hFG9cORtJb7bqi5YcsO",
    "name": "Rosca Direta na Polia Baixa",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rosca Direta na Polia Baixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/192tc4Q5_lz736hFG9cORtJb7bqi5YcsO",
    "thumbnail": "https://lh3.googleusercontent.com/d/192tc4Q5_lz736hFG9cORtJb7bqi5YcsO",
    "previewUrl": "https://lh3.googleusercontent.com/d/192tc4Q5_lz736hFG9cORtJb7bqi5YcsO"
  },
  {
    "id": "drive-1f1pNAd_hXt7OxSfx3X8Wr-9P4jxXpasS",
    "name": "Rosca Direta com Barra W (Variação 2)",
    "muscleGroup": "Bíceps",
    "equipment": "Barra W",
    "instructions": "Execução de Rosca Direta com Barra W (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1f1pNAd_hXt7OxSfx3X8Wr-9P4jxXpasS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1f1pNAd_hXt7OxSfx3X8Wr-9P4jxXpasS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1f1pNAd_hXt7OxSfx3X8Wr-9P4jxXpasS"
  },
  {
    "id": "drive-1Nl6bIle0G7YsFsgRsRlinKyodpDWl862",
    "name": "Rosca Pegada Fechada com Barra W",
    "muscleGroup": "Bíceps",
    "equipment": "Barra W",
    "instructions": "Execução de Rosca Pegada Fechada com Barra W. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Nl6bIle0G7YsFsgRsRlinKyodpDWl862",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Nl6bIle0G7YsFsgRsRlinKyodpDWl862",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Nl6bIle0G7YsFsgRsRlinKyodpDWl862"
  },
  {
    "id": "drive-1ffPbcBbs75W8wltNMWVFDBl9tqm6PCm0",
    "name": "Rosca Inclinada com Halteres",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Rosca Inclinada com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ffPbcBbs75W8wltNMWVFDBl9tqm6PCm0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ffPbcBbs75W8wltNMWVFDBl9tqm6PCm0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ffPbcBbs75W8wltNMWVFDBl9tqm6PCm0"
  },
  {
    "id": "drive-1YqCCW9iQJkXhxJvfUIB9ADhGJJbv3-uS",
    "name": "Rosca Martelo Pegada Aberta",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rosca Martelo Pegada Aberta. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YqCCW9iQJkXhxJvfUIB9ADhGJJbv3-uS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YqCCW9iQJkXhxJvfUIB9ADhGJJbv3-uS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YqCCW9iQJkXhxJvfUIB9ADhGJJbv3-uS"
  },
  {
    "id": "drive-12Vj76FrNnZDOT2fF4gFpZ2LYYsUUkxw9",
    "name": "Rosca Martelo Alternada Sentado",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rosca Martelo Alternada Sentado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12Vj76FrNnZDOT2fF4gFpZ2LYYsUUkxw9",
    "thumbnail": "https://lh3.googleusercontent.com/d/12Vj76FrNnZDOT2fF4gFpZ2LYYsUUkxw9",
    "previewUrl": "https://lh3.googleusercontent.com/d/12Vj76FrNnZDOT2fF4gFpZ2LYYsUUkxw9"
  },
  {
    "id": "drive-1iswiO1MBK302i3gqiKukCAPm2BpSn7RJ",
    "name": "Rosca Martelo Alternada (Variação 2)",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rosca Martelo Alternada (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iswiO1MBK302i3gqiKukCAPm2BpSn7RJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iswiO1MBK302i3gqiKukCAPm2BpSn7RJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iswiO1MBK302i3gqiKukCAPm2BpSn7RJ"
  },
  {
    "id": "drive-1jLx3Zv175tBXTGb0z8zEccM28JNdRYMk",
    "name": "Rosca Inversa na Máquina",
    "muscleGroup": "Bíceps",
    "equipment": "Máquina",
    "instructions": "Execução de Rosca Inversa na Máquina. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jLx3Zv175tBXTGb0z8zEccM28JNdRYMk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jLx3Zv175tBXTGb0z8zEccM28JNdRYMk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jLx3Zv175tBXTGb0z8zEccM28JNdRYMk"
  },
  {
    "id": "drive-1BYqQtd6iQSLD6RaKU9IJNqLknma0XB1f",
    "name": "Rosca Inversa na Polia Baixa",
    "muscleGroup": "Bíceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rosca Inversa na Polia Baixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BYqQtd6iQSLD6RaKU9IJNqLknma0XB1f",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BYqQtd6iQSLD6RaKU9IJNqLknma0XB1f",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BYqQtd6iQSLD6RaKU9IJNqLknma0XB1f"
  },
  {
    "id": "drive-1AEOFqRvHxTAJbXJ90nYpqFsr4n0uXdTr",
    "name": "Rosca Inversa com Barra W",
    "muscleGroup": "Bíceps",
    "equipment": "Barra W",
    "instructions": "Execução de Rosca Inversa com Barra W. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AEOFqRvHxTAJbXJ90nYpqFsr4n0uXdTr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AEOFqRvHxTAJbXJ90nYpqFsr4n0uXdTr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AEOFqRvHxTAJbXJ90nYpqFsr4n0uXdTr"
  },
  {
    "id": "drive-1-GyyLa-B_Be2wzix4std0T1XZ79VIYw-",
    "name": "Rosca Inversa com Barra (Variação 2)",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Rosca Inversa com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-GyyLa-B_Be2wzix4std0T1XZ79VIYw-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-GyyLa-B_Be2wzix4std0T1XZ79VIYw-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-GyyLa-B_Be2wzix4std0T1XZ79VIYw-"
  },
  {
    "id": "drive-15UeuuA9YmOg4l8TEu95tKKo_jHDXnK6g",
    "name": "Rosca com Rotação Rádio-Ulnar",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rosca com Rotação Rádio-Ulnar. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15UeuuA9YmOg4l8TEu95tKKo_jHDXnK6g",
    "thumbnail": "https://lh3.googleusercontent.com/d/15UeuuA9YmOg4l8TEu95tKKo_jHDXnK6g",
    "previewUrl": "https://lh3.googleusercontent.com/d/15UeuuA9YmOg4l8TEu95tKKo_jHDXnK6g"
  },
  {
    "id": "drive-1D-PJmwEJQTwQbYT4137PFuzcU4GTxpgu",
    "name": "Rosca Scott em Pé",
    "muscleGroup": "Bíceps",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rosca Scott em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1D-PJmwEJQTwQbYT4137PFuzcU4GTxpgu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1D-PJmwEJQTwQbYT4137PFuzcU4GTxpgu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1D-PJmwEJQTwQbYT4137PFuzcU4GTxpgu"
  },
  {
    "id": "drive-1kVxt71q5TIDJ42T_q_R-gXy3CnfgUSEl",
    "name": "Rosca Scott com Barra W (Variação 2)",
    "muscleGroup": "Bíceps",
    "equipment": "Barra W",
    "instructions": "Execução de Rosca Scott com Barra W (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kVxt71q5TIDJ42T_q_R-gXy3CnfgUSEl",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kVxt71q5TIDJ42T_q_R-gXy3CnfgUSEl",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kVxt71q5TIDJ42T_q_R-gXy3CnfgUSEl"
  },
  {
    "id": "drive-1zFtV415UPPoga_oZaPskrKvADCYKwJRy",
    "name": "Rosca Scott em Pé com Barra",
    "muscleGroup": "Bíceps",
    "equipment": "Barra",
    "instructions": "Execução de Rosca Scott em Pé com Barra. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zFtV415UPPoga_oZaPskrKvADCYKwJRy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zFtV415UPPoga_oZaPskrKvADCYKwJRy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zFtV415UPPoga_oZaPskrKvADCYKwJRy"
  },
  {
    "id": "drive-1NF2HjnkN9oBQJvojm_OmuJQ1RvcnUi95",
    "name": "Rosca Scott na Máquina",
    "muscleGroup": "Bíceps",
    "equipment": "Máquina",
    "instructions": "Execução de Rosca Scott na Máquina. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NF2HjnkN9oBQJvojm_OmuJQ1RvcnUi95",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NF2HjnkN9oBQJvojm_OmuJQ1RvcnUi95",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NF2HjnkN9oBQJvojm_OmuJQ1RvcnUi95"
  },
  {
    "id": "drive-10I5NoZTEBkzq6p-pe_VT5VaS4H-w8svK",
    "name": "Rosca Bíceps Deitado com Halteres",
    "muscleGroup": "Bíceps",
    "equipment": "Halteres",
    "instructions": "Execução de Rosca Bíceps Deitado com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10I5NoZTEBkzq6p-pe_VT5VaS4H-w8svK",
    "thumbnail": "https://lh3.googleusercontent.com/d/10I5NoZTEBkzq6p-pe_VT5VaS4H-w8svK",
    "previewUrl": "https://lh3.googleusercontent.com/d/10I5NoZTEBkzq6p-pe_VT5VaS4H-w8svK"
  },
  {
    "id": "drive-1ps6O64FY3BdaLKe1jXWizUogisdxwLPs",
    "name": "Rosca Direta Pegada Aberta com Barra",
    "muscleGroup": "Bíceps",
    "equipment": "Barra W",
    "instructions": "Execução de Rosca Direta Pegada Aberta com Barra. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ps6O64FY3BdaLKe1jXWizUogisdxwLPs",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ps6O64FY3BdaLKe1jXWizUogisdxwLPs",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ps6O64FY3BdaLKe1jXWizUogisdxwLPs"
  },
  {
    "id": "drive-1VYugKbEr8z2PhKYMoNgWgn3jQt2tLnTt",
    "name": "Rosca Direta Pegada Aberta com Barra W",
    "muscleGroup": "Bíceps",
    "equipment": "Barra W",
    "instructions": "Execução de Rosca Direta Pegada Aberta com Barra W. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VYugKbEr8z2PhKYMoNgWgn3jQt2tLnTt",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VYugKbEr8z2PhKYMoNgWgn3jQt2tLnTt",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VYugKbEr8z2PhKYMoNgWgn3jQt2tLnTt"
  },
  {
    "id": "drive-1qJLiIXdBk3PQ30hX8ss1yWP-YfDjhUpM",
    "name": "Air Bike",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Air Bike. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qJLiIXdBk3PQ30hX8ss1yWP-YfDjhUpM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qJLiIXdBk3PQ30hX8ss1yWP-YfDjhUpM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qJLiIXdBk3PQ30hX8ss1yWP-YfDjhUpM"
  },
  {
    "id": "drive-17A9gUfb5Kkmf4S3DPcpOIAOjagYDCrS3",
    "name": "Alpinista (Mountain Climber)",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Mountain Climber (alpinista). Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17A9gUfb5Kkmf4S3DPcpOIAOjagYDCrS3",
    "thumbnail": "https://lh3.googleusercontent.com/d/17A9gUfb5Kkmf4S3DPcpOIAOjagYDCrS3",
    "previewUrl": "https://lh3.googleusercontent.com/d/17A9gUfb5Kkmf4S3DPcpOIAOjagYDCrS3"
  },
  {
    "id": "drive-1p2WYuwphxPhl1hqk-mRPnaxSyWwxe2tj",
    "name": "Bike Horizontal",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Bike Horizontal. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1p2WYuwphxPhl1hqk-mRPnaxSyWwxe2tj",
    "thumbnail": "https://lh3.googleusercontent.com/d/1p2WYuwphxPhl1hqk-mRPnaxSyWwxe2tj",
    "previewUrl": "https://lh3.googleusercontent.com/d/1p2WYuwphxPhl1hqk-mRPnaxSyWwxe2tj"
  },
  {
    "id": "drive-1lMFWVgd8p0Rdtazr-KKXxyCBvhuDxZfi",
    "name": "Bike Vertical",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Bike Vertical. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lMFWVgd8p0Rdtazr-KKXxyCBvhuDxZfi",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lMFWVgd8p0Rdtazr-KKXxyCBvhuDxZfi",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lMFWVgd8p0Rdtazr-KKXxyCBvhuDxZfi"
  },
  {
    "id": "drive-1T_jKGpH0zmvXXh-KCSfpQwzvJlRHWHsD",
    "name": "Bike",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Bike. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1T_jKGpH0zmvXXh-KCSfpQwzvJlRHWHsD",
    "thumbnail": "https://lh3.googleusercontent.com/d/1T_jKGpH0zmvXXh-KCSfpQwzvJlRHWHsD",
    "previewUrl": "https://lh3.googleusercontent.com/d/1T_jKGpH0zmvXXh-KCSfpQwzvJlRHWHsD"
  },
  {
    "id": "drive-10X3G4oFUZXTD7de0ZhTaQpBsL9y4ZFrC",
    "name": "Caminhada Rápida",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Caminhada Rápida. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10X3G4oFUZXTD7de0ZhTaQpBsL9y4ZFrC",
    "thumbnail": "https://lh3.googleusercontent.com/d/10X3G4oFUZXTD7de0ZhTaQpBsL9y4ZFrC",
    "previewUrl": "https://lh3.googleusercontent.com/d/10X3G4oFUZXTD7de0ZhTaQpBsL9y4ZFrC"
  },
  {
    "id": "drive-1veKpL6DoExpFPWfCYl7_uTHfImHR5CcA",
    "name": "Caminhada",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Caminhada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1veKpL6DoExpFPWfCYl7_uTHfImHR5CcA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1veKpL6DoExpFPWfCYl7_uTHfImHR5CcA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1veKpL6DoExpFPWfCYl7_uTHfImHR5CcA"
  },
  {
    "id": "drive-1NfpmPAtPhZPVOWAPKUYH2QFqTCTf5r_x",
    "name": "Corrida Elevando os Calcanhares",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Chutes de Bunda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NfpmPAtPhZPVOWAPKUYH2QFqTCTf5r_x",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NfpmPAtPhZPVOWAPKUYH2QFqTCTf5r_x",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NfpmPAtPhZPVOWAPKUYH2QFqTCTf5r_x"
  },
  {
    "id": "drive-1J8mU1kjrrPIT7bL8zVl6GFStqZIAwQsh",
    "name": "Cooper",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Cooper. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1J8mU1kjrrPIT7bL8zVl6GFStqZIAwQsh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1J8mU1kjrrPIT7bL8zVl6GFStqZIAwQsh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1J8mU1kjrrPIT7bL8zVl6GFStqZIAwQsh"
  },
  {
    "id": "drive-1Rbk0f0J3k2hqvWyW_Qi8lxYfE4VTBZUO",
    "name": "Corda Mariner",
    "muscleGroup": "Cardio",
    "equipment": "Corda Naval",
    "instructions": "Execução de Corda Mariner. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Rbk0f0J3k2hqvWyW_Qi8lxYfE4VTBZUO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Rbk0f0J3k2hqvWyW_Qi8lxYfE4VTBZUO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Rbk0f0J3k2hqvWyW_Qi8lxYfE4VTBZUO"
  },
  {
    "id": "drive-13XYjNP2_SNPkz56RWFkvJ6AkP5v1fXol",
    "name": "Corrida de Pés Rápida",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Corrida de Pés Rápida. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13XYjNP2_SNPkz56RWFkvJ6AkP5v1fXol",
    "thumbnail": "https://lh3.googleusercontent.com/d/13XYjNP2_SNPkz56RWFkvJ6AkP5v1fXol",
    "previewUrl": "https://lh3.googleusercontent.com/d/13XYjNP2_SNPkz56RWFkvJ6AkP5v1fXol"
  },
  {
    "id": "drive-1TQ5oaEzYCLBu6jENwoq0kMZY984gWLZV",
    "name": "Corrida Estática",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Corrida Estática. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TQ5oaEzYCLBu6jENwoq0kMZY984gWLZV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TQ5oaEzYCLBu6jENwoq0kMZY984gWLZV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TQ5oaEzYCLBu6jENwoq0kMZY984gWLZV"
  },
  {
    "id": "drive-1rnvvFkizbuDW71B4QMMQSNBezZfbaSmi",
    "name": "Corrida para Trás",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Corrida para Trás. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rnvvFkizbuDW71B4QMMQSNBezZfbaSmi",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rnvvFkizbuDW71B4QMMQSNBezZfbaSmi",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rnvvFkizbuDW71B4QMMQSNBezZfbaSmi"
  },
  {
    "id": "drive-14_nlfCRQaVBqoWpD6JWWOE1f3RTRU4JO",
    "name": "Eliptico Braços",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Eliptico Braços. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14_nlfCRQaVBqoWpD6JWWOE1f3RTRU4JO",
    "thumbnail": "https://lh3.googleusercontent.com/d/14_nlfCRQaVBqoWpD6JWWOE1f3RTRU4JO",
    "previewUrl": "https://lh3.googleusercontent.com/d/14_nlfCRQaVBqoWpD6JWWOE1f3RTRU4JO"
  },
  {
    "id": "drive-1bXV9i_OztHtv3G6vWo7aGDRatXf2glZk",
    "name": "Elíptico C Braços",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Elíptico C Braços. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bXV9i_OztHtv3G6vWo7aGDRatXf2glZk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bXV9i_OztHtv3G6vWo7aGDRatXf2glZk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bXV9i_OztHtv3G6vWo7aGDRatXf2glZk"
  },
  {
    "id": "drive-1VUXINu9v6tmM7znMZHf3CrHBUAXV21v0",
    "name": "Elíptico",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Elíptico. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VUXINu9v6tmM7znMZHf3CrHBUAXV21v0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VUXINu9v6tmM7znMZHf3CrHBUAXV21v0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VUXINu9v6tmM7znMZHf3CrHBUAXV21v0"
  },
  {
    "id": "drive-1k4NCib9ThgO_a3QMacjb327BvqeFlY_s",
    "name": "Salto Energético (Cardio)",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Energy Pular. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1k4NCib9ThgO_a3QMacjb327BvqeFlY_s",
    "thumbnail": "https://lh3.googleusercontent.com/d/1k4NCib9ThgO_a3QMacjb327BvqeFlY_s",
    "previewUrl": "https://lh3.googleusercontent.com/d/1k4NCib9ThgO_a3QMacjb327BvqeFlY_s"
  },
  {
    "id": "drive-19F8Ynm6YhWgkgAH6mleOlA_-Gl7etB8H",
    "name": "Escada",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Escada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19F8Ynm6YhWgkgAH6mleOlA_-Gl7etB8H",
    "thumbnail": "https://lh3.googleusercontent.com/d/19F8Ynm6YhWgkgAH6mleOlA_-Gl7etB8H",
    "previewUrl": "https://lh3.googleusercontent.com/d/19F8Ynm6YhWgkgAH6mleOlA_-Gl7etB8H"
  },
  {
    "id": "drive-11JisDSgr7Z9DLM81BTvgV6RjMSxCXo59",
    "name": "Caminhada/Corrida na Esteira Inclinada",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Esteira Inclinda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11JisDSgr7Z9DLM81BTvgV6RjMSxCXo59",
    "thumbnail": "https://lh3.googleusercontent.com/d/11JisDSgr7Z9DLM81BTvgV6RjMSxCXo59",
    "previewUrl": "https://lh3.googleusercontent.com/d/11JisDSgr7Z9DLM81BTvgV6RjMSxCXo59"
  },
  {
    "id": "drive-1XoSW3GEG8JamDGQKnNr7KxdOAV7Y8d61",
    "name": "Esteira",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Esteira. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XoSW3GEG8JamDGQKnNr7KxdOAV7Y8d61",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XoSW3GEG8JamDGQKnNr7KxdOAV7Y8d61",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XoSW3GEG8JamDGQKnNr7KxdOAV7Y8d61"
  },
  {
    "id": "drive-1uZ7dZDmuOw7MafqqWvasx1JucNjZNrFC",
    "name": "Polichinelo (Jumping Jack)",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Jumping Jack. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1uZ7dZDmuOw7MafqqWvasx1JucNjZNrFC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1uZ7dZDmuOw7MafqqWvasx1JucNjZNrFC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1uZ7dZDmuOw7MafqqWvasx1JucNjZNrFC"
  },
  {
    "id": "drive-1mwAEHChbwWXn8ivOfWyprIyH1Qtys9TN",
    "name": "Polichinelo Pliométrico",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Plyo Jacks. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mwAEHChbwWXn8ivOfWyprIyH1Qtys9TN",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mwAEHChbwWXn8ivOfWyprIyH1Qtys9TN",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mwAEHChbwWXn8ivOfWyprIyH1Qtys9TN"
  },
  {
    "id": "drive-1Ax90lgERGBBl7G-u5hKukMDsv0lTtNc2",
    "name": "Prancha Dinâmica Cardio",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Prank. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Ax90lgERGBBl7G-u5hKukMDsv0lTtNc2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Ax90lgERGBBl7G-u5hKukMDsv0lTtNc2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Ax90lgERGBBl7G-u5hKukMDsv0lTtNc2"
  },
  {
    "id": "drive-1gnbL6hRCz8UtxLGXUrxAqGrDR83SHv_w",
    "name": "Pular Corda",
    "muscleGroup": "Cardio",
    "equipment": "Corda Naval",
    "instructions": "Execução de Pular Corda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gnbL6hRCz8UtxLGXUrxAqGrDR83SHv_w",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gnbL6hRCz8UtxLGXUrxAqGrDR83SHv_w",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gnbL6hRCz8UtxLGXUrxAqGrDR83SHv_w"
  },
  {
    "id": "drive-1yV3zRBlmZ08-vVOm2Dc-LHITw85AxiOC",
    "name": "Flexão de Braço com Toque na Ponta do Pé",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Flexão de Braço Toe Touch. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yV3zRBlmZ08-vVOm2Dc-LHITw85AxiOC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yV3zRBlmZ08-vVOm2Dc-LHITw85AxiOC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yV3zRBlmZ08-vVOm2Dc-LHITw85AxiOC"
  },
  {
    "id": "drive-1_MqKts_TEymsuNaCZvSnYbEdN1P81J_X",
    "name": "Rodada",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Rodada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_MqKts_TEymsuNaCZvSnYbEdN1P81J_X",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_MqKts_TEymsuNaCZvSnYbEdN1P81J_X",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_MqKts_TEymsuNaCZvSnYbEdN1P81J_X"
  },
  {
    "id": "drive-1mNsNFGelKL1FxIIzf5h_AIZnBa-E4V_U",
    "name": "Remo Ergômetro (Cardio)",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Rowing. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mNsNFGelKL1FxIIzf5h_AIZnBa-E4V_U",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mNsNFGelKL1FxIIzf5h_AIZnBa-E4V_U",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mNsNFGelKL1FxIIzf5h_AIZnBa-E4V_U"
  },
  {
    "id": "drive-12vINuGFNBB2i-T-3inE-ZS_C9Nb2uaYB",
    "name": "Spinning",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Spinning. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12vINuGFNBB2i-T-3inE-ZS_C9Nb2uaYB",
    "thumbnail": "https://lh3.googleusercontent.com/d/12vINuGFNBB2i-T-3inE-ZS_C9Nb2uaYB",
    "previewUrl": "https://lh3.googleusercontent.com/d/12vINuGFNBB2i-T-3inE-ZS_C9Nb2uaYB"
  },
  {
    "id": "drive-1djDJlZNj1P9Mc4VwNj3w_0VZzUedtpfe",
    "name": "Polichinelo Frontal (Split Jack)",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Split Jacks. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1djDJlZNj1P9Mc4VwNj3w_0VZzUedtpfe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1djDJlZNj1P9Mc4VwNj3w_0VZzUedtpfe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1djDJlZNj1P9Mc4VwNj3w_0VZzUedtpfe"
  },
  {
    "id": "drive-1ONfRTUtabUAuoWHpvi1zBZNWgkqfR2mV",
    "name": "Torçoes",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Torçoes. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ONfRTUtabUAuoWHpvi1zBZNWgkqfR2mV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ONfRTUtabUAuoWHpvi1zBZNWgkqfR2mV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ONfRTUtabUAuoWHpvi1zBZNWgkqfR2mV"
  },
  {
    "id": "drive-1D2kbe4Kxn6wSM7JNZwZpldL4M-gzmRxQ",
    "name": "Esteira Manual / Sem Motor",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Treadmill Manual. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1D2kbe4Kxn6wSM7JNZwZpldL4M-gzmRxQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1D2kbe4Kxn6wSM7JNZwZpldL4M-gzmRxQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1D2kbe4Kxn6wSM7JNZwZpldL4M-gzmRxQ"
  },
  {
    "id": "drive-1n8cqzdhq5y-5p55HKU2hggO4l0-EIHRx",
    "name": "Salto Agrupado (Tuck Jump)",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Tuck Jump. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1n8cqzdhq5y-5p55HKU2hggO4l0-EIHRx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1n8cqzdhq5y-5p55HKU2hggO4l0-EIHRx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1n8cqzdhq5y-5p55HKU2hggO4l0-EIHRx"
  },
  {
    "id": "drive-1fBO-dqIr9KBYEWhiT-2MSWiwSeyet7Ra",
    "name": "Velocista Assistida",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Velocista Assistida. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fBO-dqIr9KBYEWhiT-2MSWiwSeyet7Ra",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fBO-dqIr9KBYEWhiT-2MSWiwSeyet7Ra",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fBO-dqIr9KBYEWhiT-2MSWiwSeyet7Ra"
  },
  {
    "id": "drive-1K9WbjMTt7cD6lZJ8RCDro4xOc4bz8076",
    "name": "Zig Zag",
    "muscleGroup": "Cardio",
    "equipment": "Aparelho Aeróbico",
    "instructions": "Execução de Zig Zag. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1K9WbjMTt7cD6lZJ8RCDro4xOc4bz8076",
    "thumbnail": "https://lh3.googleusercontent.com/d/1K9WbjMTt7cD6lZJ8RCDro4xOc4bz8076",
    "previewUrl": "https://lh3.googleusercontent.com/d/1K9WbjMTt7cD6lZJ8RCDro4xOc4bz8076"
  },
  {
    "id": "drive-1IlrrzzCUJzEvcPIWe0jCv8vCth4_lhXh",
    "name": "Extensão Lombar (Banco Romano)",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Back Extensão. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IlrrzzCUJzEvcPIWe0jCv8vCth4_lhXh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IlrrzzCUJzEvcPIWe0jCv8vCth4_lhXh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IlrrzzCUJzEvcPIWe0jCv8vCth4_lhXh"
  },
  {
    "id": "drive-1QdYwM-2N7j4WHJy-w16qWPnrxT9PhF8y",
    "name": "Barra Fixa com Elástico",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa com Elástico. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QdYwM-2N7j4WHJy-w16qWPnrxT9PhF8y",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QdYwM-2N7j4WHJy-w16qWPnrxT9PhF8y",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QdYwM-2N7j4WHJy-w16qWPnrxT9PhF8y"
  },
  {
    "id": "drive-1GgSZgQY2kP542SafZABaj1qQjqRyWqWU",
    "name": "Puxada com Elástico",
    "muscleGroup": "Costas",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Puxada com Elástico. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GgSZgQY2kP542SafZABaj1qQjqRyWqWU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GgSZgQY2kP542SafZABaj1qQjqRyWqWU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GgSZgQY2kP542SafZABaj1qQjqRyWqWU"
  },
  {
    "id": "drive-1r9m5FRpazIFLhLW811hVg-iTJm96-BKM",
    "name": "Crucifixo Inverso com Elástico",
    "muscleGroup": "Costas",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Crucifixo Inverso com Elástico. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1r9m5FRpazIFLhLW811hVg-iTJm96-BKM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1r9m5FRpazIFLhLW811hVg-iTJm96-BKM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1r9m5FRpazIFLhLW811hVg-iTJm96-BKM"
  },
  {
    "id": "drive-1T-DZqVt0glvQ_w7Jc1rCiRiZMyVnVrHG",
    "name": "Remada Aberta com Elástico",
    "muscleGroup": "Costas",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Banded Wide Grip Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1T-DZqVt0glvQ_w7Jc1rCiRiZMyVnVrHG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1T-DZqVt0glvQ_w7Jc1rCiRiZMyVnVrHG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1T-DZqVt0glvQ_w7Jc1rCiRiZMyVnVrHG"
  },
  {
    "id": "drive-1mCFJshFcJRlimZGk36A-ZOA-_qoLh1Cv",
    "name": "Remada Curvada com Barra",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Bent Over Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mCFJshFcJRlimZGk36A-ZOA-_qoLh1Cv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mCFJshFcJRlimZGk36A-ZOA-_qoLh1Cv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mCFJshFcJRlimZGk36A-ZOA-_qoLh1Cv"
  },
  {
    "id": "drive-18yfND8r9VPIIK_2xkl6zTBpoNenzFCqA",
    "name": "Encolhimento de Ombros com Barra",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Shrug Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18yfND8r9VPIIK_2xkl6zTBpoNenzFCqA",
    "thumbnail": "https://lh3.googleusercontent.com/d/18yfND8r9VPIIK_2xkl6zTBpoNenzFCqA",
    "previewUrl": "https://lh3.googleusercontent.com/d/18yfND8r9VPIIK_2xkl6zTBpoNenzFCqA"
  },
  {
    "id": "drive-19LcbFp0uTjM8rqKhG6suSBe1kBmY-YK0",
    "name": "Remada Alta em Pé com Barra",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Upright Row Standing. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19LcbFp0uTjM8rqKhG6suSBe1kBmY-YK0",
    "thumbnail": "https://lh3.googleusercontent.com/d/19LcbFp0uTjM8rqKhG6suSBe1kBmY-YK0",
    "previewUrl": "https://lh3.googleusercontent.com/d/19LcbFp0uTjM8rqKhG6suSBe1kBmY-YK0"
  },
  {
    "id": "drive-1N7LKaeJ1e_qy8er88Y6ZrJSH9RTh8UG5",
    "name": "Barra Assistida",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Assistida. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1N7LKaeJ1e_qy8er88Y6ZrJSH9RTh8UG5",
    "thumbnail": "https://lh3.googleusercontent.com/d/1N7LKaeJ1e_qy8er88Y6ZrJSH9RTh8UG5",
    "previewUrl": "https://lh3.googleusercontent.com/d/1N7LKaeJ1e_qy8er88Y6ZrJSH9RTh8UG5"
  },
  {
    "id": "drive-1g46wYFU6QzuN_5L2ajZyrTMyVb8ABiKa",
    "name": "Barra Fixa Aberta",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa Aberta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1g46wYFU6QzuN_5L2ajZyrTMyVb8ABiKa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1g46wYFU6QzuN_5L2ajZyrTMyVb8ABiKa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1g46wYFU6QzuN_5L2ajZyrTMyVb8ABiKa"
  },
  {
    "id": "drive-1Jgtahgk9jVIj0lZpMP2PL3AeEg-bL5Xs",
    "name": "Barra Fixa com Carga",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa com Carga. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Jgtahgk9jVIj0lZpMP2PL3AeEg-bL5Xs",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Jgtahgk9jVIj0lZpMP2PL3AeEg-bL5Xs",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Jgtahgk9jVIj0lZpMP2PL3AeEg-bL5Xs"
  },
  {
    "id": "drive-1_lerhELAjV-WvBT0QjXn7YeJev2Y8EKU",
    "name": "Barra Fixa Fechada",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa Fechada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_lerhELAjV-WvBT0QjXn7YeJev2Y8EKU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_lerhELAjV-WvBT0QjXn7YeJev2Y8EKU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_lerhELAjV-WvBT0QjXn7YeJev2Y8EKU"
  },
  {
    "id": "drive-1ToANCf-hbOYUcCHjXYs5HRfzM2jbgvzl",
    "name": "Barra Fixa Por Trás",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa Por Trás. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ToANCf-hbOYUcCHjXYs5HRfzM2jbgvzl",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ToANCf-hbOYUcCHjXYs5HRfzM2jbgvzl",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ToANCf-hbOYUcCHjXYs5HRfzM2jbgvzl"
  },
  {
    "id": "drive-12yXP6hBgMXCktwnHQa2VYMkb88-Q4Wyy",
    "name": "Encolhimento de Ombros por Trás com Barra",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Behind The Back Shrug. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12yXP6hBgMXCktwnHQa2VYMkb88-Q4Wyy",
    "thumbnail": "https://lh3.googleusercontent.com/d/12yXP6hBgMXCktwnHQa2VYMkb88-Q4Wyy",
    "previewUrl": "https://lh3.googleusercontent.com/d/12yXP6hBgMXCktwnHQa2VYMkb88-Q4Wyy"
  },
  {
    "id": "drive-1yASiij4ghg7hvwJ42JfyG45foD7Zd7Hb",
    "name": "Face Pull na Polia com Corda",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Face Pull. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yASiij4ghg7hvwJ42JfyG45foD7Zd7Hb",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yASiij4ghg7hvwJ42JfyG45foD7Zd7Hb",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yASiij4ghg7hvwJ42JfyG45foD7Zd7Hb"
  },
  {
    "id": "drive-1J3pOuBFZ03ZKaxCYkEielXfFiaev2bSk",
    "name": "Elevação Frontal na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Front Raise Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1J3pOuBFZ03ZKaxCYkEielXfFiaev2bSk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1J3pOuBFZ03ZKaxCYkEielXfFiaev2bSk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1J3pOuBFZ03ZKaxCYkEielXfFiaev2bSk"
  },
  {
    "id": "drive-1SIHKXiCk8ykbZ3ZHvMPucbQYvuq5sNYM",
    "name": "Pulldown Reto na Polia Alta",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Pushdown. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1SIHKXiCk8ykbZ3ZHvMPucbQYvuq5sNYM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1SIHKXiCk8ykbZ3ZHvMPucbQYvuq5sNYM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1SIHKXiCk8ykbZ3ZHvMPucbQYvuq5sNYM"
  },
  {
    "id": "drive-1rr517ITVt-mHgL65MIVT7W6F-AipHTnf",
    "name": "Crucifixo Inverso na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Rear Delt Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rr517ITVt-mHgL65MIVT7W6F-AipHTnf",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rr517ITVt-mHgL65MIVT7W6F-AipHTnf",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rr517ITVt-mHgL65MIVT7W6F-AipHTnf"
  },
  {
    "id": "drive-11XHq9LuwSgelTZYeevI7z5J33tsLUrsU",
    "name": "Remada Baixa Sentada na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Seated Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11XHq9LuwSgelTZYeevI7z5J33tsLUrsU",
    "thumbnail": "https://lh3.googleusercontent.com/d/11XHq9LuwSgelTZYeevI7z5J33tsLUrsU",
    "previewUrl": "https://lh3.googleusercontent.com/d/11XHq9LuwSgelTZYeevI7z5J33tsLUrsU"
  },
  {
    "id": "drive-1FK8lkKTQWQPgrniMqB_O1cSOvEB8wxIh",
    "name": "Encolhimento de Ombros na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Shrug. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FK8lkKTQWQPgrniMqB_O1cSOvEB8wxIh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FK8lkKTQWQPgrniMqB_O1cSOvEB8wxIh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FK8lkKTQWQPgrniMqB_O1cSOvEB8wxIh"
  },
  {
    "id": "drive-1TzpIZy4GK49PwIgPYjOKMlSfx7eXlnMg",
    "name": "Remada Aberta na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Wide Grip Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TzpIZy4GK49PwIgPYjOKMlSfx7eXlnMg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TzpIZy4GK49PwIgPYjOKMlSfx7eXlnMg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TzpIZy4GK49PwIgPYjOKMlSfx7eXlnMg"
  },
  {
    "id": "drive-1DejSnzznoi75PYZdISPOjbO52zc0ozoh",
    "name": "Cabo Duplo Neutra",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo Duplo Neutra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DejSnzznoi75PYZdISPOjbO52zc0ozoh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DejSnzznoi75PYZdISPOjbO52zc0ozoh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DejSnzznoi75PYZdISPOjbO52zc0ozoh"
  },
  {
    "id": "drive-1iHFBsXRIzFq_KhDtIJBQ_JTXIGUL7kZD",
    "name": "Chin Ups",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Chin Ups. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iHFBsXRIzFq_KhDtIJBQ_JTXIGUL7kZD",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iHFBsXRIzFq_KhDtIJBQ_JTXIGUL7kZD",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iHFBsXRIzFq_KhDtIJBQ_JTXIGUL7kZD"
  },
  {
    "id": "drive-1i17xMUQ2M9DDozsUjonp9nkYmg0h8Din",
    "name": "Puxada Alta Pegada Fechada com Barra Reta",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Close Grip Lat Pulldown Standard Bar Attachment. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1i17xMUQ2M9DDozsUjonp9nkYmg0h8Din",
    "thumbnail": "https://lh3.googleusercontent.com/d/1i17xMUQ2M9DDozsUjonp9nkYmg0h8Din",
    "previewUrl": "https://lh3.googleusercontent.com/d/1i17xMUQ2M9DDozsUjonp9nkYmg0h8Din"
  },
  {
    "id": "drive-1naOiBZB0sfrOUtK9RWVimTfWfBQ7zlHW",
    "name": "Puxada Alta Pegada Fechada",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Close Grip Lat Pulldown. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1naOiBZB0sfrOUtK9RWVimTfWfBQ7zlHW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1naOiBZB0sfrOUtK9RWVimTfWfBQ7zlHW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1naOiBZB0sfrOUtK9RWVimTfWfBQ7zlHW"
  },
  {
    "id": "drive-1xy2cUL3iP84lVF4cJzPYqUBbAOQJ5BVe",
    "name": "Cruzado Polia Alta",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cruzado Polia Alta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xy2cUL3iP84lVF4cJzPYqUBbAOQJ5BVe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xy2cUL3iP84lVF4cJzPYqUBbAOQJ5BVe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xy2cUL3iP84lVF4cJzPYqUBbAOQJ5BVe"
  },
  {
    "id": "drive-1-OoVCdtmzkcaboCTmBMPcPFmb88NzQVJ",
    "name": "Suspensão na Barra Fixa (Dead Hang)",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Dead Hang. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-OoVCdtmzkcaboCTmBMPcPFmb88NzQVJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-OoVCdtmzkcaboCTmBMPcPFmb88NzQVJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-OoVCdtmzkcaboCTmBMPcPFmb88NzQVJ"
  },
  {
    "id": "drive-1M7T2kICzsKeaEn044QlLUQ9NTQfR5GhO",
    "name": "Extensão Lombar com Haltere",
    "muscleGroup": "Costas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Back Extensão. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1M7T2kICzsKeaEn044QlLUQ9NTQfR5GhO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1M7T2kICzsKeaEn044QlLUQ9NTQfR5GhO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1M7T2kICzsKeaEn044QlLUQ9NTQfR5GhO"
  },
  {
    "id": "drive-1X2kQSsr_Q-Bygl3vRmYNd-pBpbKhsIfd",
    "name": "Face Pull Inclinado com Halteres",
    "muscleGroup": "Costas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Face Pull. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1X2kQSsr_Q-Bygl3vRmYNd-pBpbKhsIfd",
    "thumbnail": "https://lh3.googleusercontent.com/d/1X2kQSsr_Q-Bygl3vRmYNd-pBpbKhsIfd",
    "previewUrl": "https://lh3.googleusercontent.com/d/1X2kQSsr_Q-Bygl3vRmYNd-pBpbKhsIfd"
  },
  {
    "id": "drive-1RqhRXUHwTlwchahjaOgu9A43iHEBUY4f",
    "name": "Flexão/Rotação Jefferson com Haltere",
    "muscleGroup": "Costas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Jefferson Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RqhRXUHwTlwchahjaOgu9A43iHEBUY4f",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RqhRXUHwTlwchahjaOgu9A43iHEBUY4f",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RqhRXUHwTlwchahjaOgu9A43iHEBUY4f"
  },
  {
    "id": "drive-1O9QrzO7aOlnK2t8rcuEZuPMTnvVd9OaH",
    "name": "Crucifixo Inverso com Halteres",
    "muscleGroup": "Costas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Rear Delt Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1O9QrzO7aOlnK2t8rcuEZuPMTnvVd9OaH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1O9QrzO7aOlnK2t8rcuEZuPMTnvVd9OaH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1O9QrzO7aOlnK2t8rcuEZuPMTnvVd9OaH"
  },
  {
    "id": "drive-1SNXe-kPPN8P7sQAofDqE-Y61vvitxbxZ",
    "name": "Eccentric Barra Fixa",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Eccentric Barra Fixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1SNXe-kPPN8P7sQAofDqE-Y61vvitxbxZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1SNXe-kPPN8P7sQAofDqE-Y61vvitxbxZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1SNXe-kPPN8P7sQAofDqE-Y61vvitxbxZ"
  },
  {
    "id": "drive-1dEg9ETVmUwAD-P121Hz_icsprBbCr4mP",
    "name": "Elevação Lateral com Kettlebell",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Kettlebell Lateral Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dEg9ETVmUwAD-P121Hz_icsprBbCr4mP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dEg9ETVmUwAD-P121Hz_icsprBbCr4mP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dEg9ETVmUwAD-P121Hz_icsprBbCr4mP"
  },
  {
    "id": "drive-1WUaUNawMVMP3UpmQ_ZZ_XzPoNF8lAHFQ",
    "name": "Remada Cavalinho no Landmine",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Landmine Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WUaUNawMVMP3UpmQ_ZZ_XzPoNF8lAHFQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WUaUNawMVMP3UpmQ_ZZ_XzPoNF8lAHFQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WUaUNawMVMP3UpmQ_ZZ_XzPoNF8lAHFQ"
  },
  {
    "id": "drive-1I97QrOwkaUGmd6WaLNV1s1kch58dOF0n",
    "name": "Linha Invertida",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Linha Invertida. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I97QrOwkaUGmd6WaLNV1s1kch58dOF0n",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I97QrOwkaUGmd6WaLNV1s1kch58dOF0n",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I97QrOwkaUGmd6WaLNV1s1kch58dOF0n"
  },
  {
    "id": "drive-11nGrnIJEA7HsfhcipyjATAfHFfWQJYnm",
    "name": "Maquina Encurtada",
    "muscleGroup": "Costas",
    "equipment": "Máquina",
    "instructions": "Execução de Maquina Encurtada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11nGrnIJEA7HsfhcipyjATAfHFfWQJYnm",
    "thumbnail": "https://lh3.googleusercontent.com/d/11nGrnIJEA7HsfhcipyjATAfHFfWQJYnm",
    "previewUrl": "https://lh3.googleusercontent.com/d/11nGrnIJEA7HsfhcipyjATAfHFfWQJYnm"
  },
  {
    "id": "drive-1lIzPPwStzNi0KaNGd4PLBFzBjWQy-un4",
    "name": "Remada Baixa Pegada Neutra na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Neutral Grip Cabo / Polia Rows. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lIzPPwStzNi0KaNGd4PLBFzBjWQy-un4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lIzPPwStzNi0KaNGd4PLBFzBjWQy-un4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lIzPPwStzNi0KaNGd4PLBFzBjWQy-un4"
  },
  {
    "id": "drive-1oSFHqVR2KnNZSI9z8KPCIPlfm9Pw0ag4",
    "name": "Remada Pendlay com Barra",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Pendlay Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1oSFHqVR2KnNZSI9z8KPCIPlfm9Pw0ag4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1oSFHqVR2KnNZSI9z8KPCIPlfm9Pw0ag4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1oSFHqVR2KnNZSI9z8KPCIPlfm9Pw0ag4"
  },
  {
    "id": "drive-1JB50aspx3jkAgFZWdbC3dm_MHVKFEVYU",
    "name": "Barra Fixa Fechado",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa Fechado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JB50aspx3jkAgFZWdbC3dm_MHVKFEVYU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JB50aspx3jkAgFZWdbC3dm_MHVKFEVYU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JB50aspx3jkAgFZWdbC3dm_MHVKFEVYU"
  },
  {
    "id": "drive-10RnJramn8BipL5nafx2KxFoqX6OGyrWu",
    "name": "Barra Fixa Pegada Reversa",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa Pegada Reversa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10RnJramn8BipL5nafx2KxFoqX6OGyrWu",
    "thumbnail": "https://lh3.googleusercontent.com/d/10RnJramn8BipL5nafx2KxFoqX6OGyrWu",
    "previewUrl": "https://lh3.googleusercontent.com/d/10RnJramn8BipL5nafx2KxFoqX6OGyrWu"
  },
  {
    "id": "drive-1-yFOV4SpvlI6kAmfqmembYUPvnuKB5zw",
    "name": "Barra Fixa",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Fixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-yFOV4SpvlI6kAmfqmembYUPvnuKB5zw",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-yFOV4SpvlI6kAmfqmembYUPvnuKB5zw",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-yFOV4SpvlI6kAmfqmembYUPvnuKB5zw"
  },
  {
    "id": "drive-1n1nxvOpgyx4s0C7Zot4dRhYScI0Qz65_",
    "name": "Pulldown com Corda na Polia Alta",
    "muscleGroup": "Costas",
    "equipment": "Corda Naval",
    "instructions": "Execução de Pulldown Corda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1n1nxvOpgyx4s0C7Zot4dRhYScI0Qz65_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1n1nxvOpgyx4s0C7Zot4dRhYScI0Qz65_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1n1nxvOpgyx4s0C7Zot4dRhYScI0Qz65_"
  },
  {
    "id": "drive-1LtHyYEucX5stSrcjaUOsBaNiPCdkUDsA",
    "name": "Puxada Frontal na Polia Alta",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Pulldown Frontal. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LtHyYEucX5stSrcjaUOsBaNiPCdkUDsA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LtHyYEucX5stSrcjaUOsBaNiPCdkUDsA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LtHyYEucX5stSrcjaUOsBaNiPCdkUDsA"
  },
  {
    "id": "drive-1LDEMcA-S_ifVBNTpRZ1Ih8ojPDHJvHDY",
    "name": "Puxada Alta Fechada",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Puxada Alta Fechada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LDEMcA-S_ifVBNTpRZ1Ih8ojPDHJvHDY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LDEMcA-S_ifVBNTpRZ1Ih8ojPDHJvHDY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LDEMcA-S_ifVBNTpRZ1Ih8ojPDHJvHDY"
  },
  {
    "id": "drive-1wVbUmgzkINYQM53xV738M-mz2PfA6158",
    "name": "Puxada Alta Pegada Reversa",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Puxada Alta Pegada Reversa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wVbUmgzkINYQM53xV738M-mz2PfA6158",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wVbUmgzkINYQM53xV738M-mz2PfA6158",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wVbUmgzkINYQM53xV738M-mz2PfA6158"
  },
  {
    "id": "drive-1aE9BdY2AhzeptW0DPSbH7Ya6e4GsY_ZU",
    "name": "Puxada de Polia Unilateral",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Puxada de Polia Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aE9BdY2AhzeptW0DPSbH7Ya6e4GsY_ZU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aE9BdY2AhzeptW0DPSbH7Ya6e4GsY_ZU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aE9BdY2AhzeptW0DPSbH7Ya6e4GsY_ZU"
  },
  {
    "id": "drive-1ig8ssGHbFBL_02kipMfDtFKvBnu6llAm",
    "name": "Puxada Frontal",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Puxada Frontal. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ig8ssGHbFBL_02kipMfDtFKvBnu6llAm",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ig8ssGHbFBL_02kipMfDtFKvBnu6llAm",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ig8ssGHbFBL_02kipMfDtFKvBnu6llAm"
  },
  {
    "id": "drive-1IzXDFUisug_rra7Av-nTPCEErxXb9CZ0",
    "name": "Puxada Por Trás",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Puxada Por Trás. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IzXDFUisug_rra7Av-nTPCEErxXb9CZ0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IzXDFUisug_rra7Av-nTPCEErxXb9CZ0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IzXDFUisug_rra7Av-nTPCEErxXb9CZ0"
  },
  {
    "id": "drive-1YOgvxQGmxk1X6vXXb1iMEGjtlJFhwso2",
    "name": "Puxada Unilateral",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Puxada Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YOgvxQGmxk1X6vXXb1iMEGjtlJFhwso2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YOgvxQGmxk1X6vXXb1iMEGjtlJFhwso2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YOgvxQGmxk1X6vXXb1iMEGjtlJFhwso2"
  },
  {
    "id": "drive-1NCSCZeRGCrZMVb7tuN-eFXl-gTILQRw0",
    "name": "Remada Aberta",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Remada Aberta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NCSCZeRGCrZMVb7tuN-eFXl-gTILQRw0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NCSCZeRGCrZMVb7tuN-eFXl-gTILQRw0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NCSCZeRGCrZMVb7tuN-eFXl-gTILQRw0"
  },
  {
    "id": "drive-1b1J7zWW20aj1y_iv8wD6OToFUrYhCfMU",
    "name": "Remada Cavalinho",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada Cavalinho. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1b1J7zWW20aj1y_iv8wD6OToFUrYhCfMU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1b1J7zWW20aj1y_iv8wD6OToFUrYhCfMU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1b1J7zWW20aj1y_iv8wD6OToFUrYhCfMU"
  },
  {
    "id": "drive-1q-zskv-H7elFYC178A7nYHl1GvD_w6wz",
    "name": "Remada Curvada com Barra (Variação 2)",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Remada Curvada com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1q-zskv-H7elFYC178A7nYHl1GvD_w6wz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1q-zskv-H7elFYC178A7nYHl1GvD_w6wz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1q-zskv-H7elFYC178A7nYHl1GvD_w6wz"
  },
  {
    "id": "drive-1i_Q-TPsmgsJYtBDiBOzgqOMezPVmnmPa",
    "name": "Remada Curvada com Barra (Variação 3)",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Remada Curvada com Barra (Variação 3). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1i_Q-TPsmgsJYtBDiBOzgqOMezPVmnmPa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1i_Q-TPsmgsJYtBDiBOzgqOMezPVmnmPa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1i_Q-TPsmgsJYtBDiBOzgqOMezPVmnmPa"
  },
  {
    "id": "drive-1Uiw8ddjcirRgd4ZpS2-sjPXxVEQoZV0O",
    "name": "Remada Curvada no Smith",
    "muscleGroup": "Costas",
    "equipment": "Máquina Smith",
    "instructions": "Execução de Remada Curvada no Smith. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Uiw8ddjcirRgd4ZpS2-sjPXxVEQoZV0O",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Uiw8ddjcirRgd4ZpS2-sjPXxVEQoZV0O",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Uiw8ddjcirRgd4ZpS2-sjPXxVEQoZV0O"
  },
  {
    "id": "drive-16wQPriiqh6B8YAsyABPhvyXKU09StWV1",
    "name": "Remada Curvada Pegada Alta",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada Curvada Pegada Alta. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/16wQPriiqh6B8YAsyABPhvyXKU09StWV1",
    "thumbnail": "https://lh3.googleusercontent.com/d/16wQPriiqh6B8YAsyABPhvyXKU09StWV1",
    "previewUrl": "https://lh3.googleusercontent.com/d/16wQPriiqh6B8YAsyABPhvyXKU09StWV1"
  },
  {
    "id": "drive-1AOGgkUh-C47b9cEkTOi4D-_SyM1AAX-w",
    "name": "Remada Ajoelhado na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Remada Ajoelhado na Polia. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AOGgkUh-C47b9cEkTOi4D-_SyM1AAX-w",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AOGgkUh-C47b9cEkTOi4D-_SyM1AAX-w",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AOGgkUh-C47b9cEkTOi4D-_SyM1AAX-w"
  },
  {
    "id": "drive-1vSuN2UQOPlDrHjxXfen6OS08U1o1KOjV",
    "name": "Remada Cavalinho em T",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada Cavalinho em T. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1vSuN2UQOPlDrHjxXfen6OS08U1o1KOjV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1vSuN2UQOPlDrHjxXfen6OS08U1o1KOjV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1vSuN2UQOPlDrHjxXfen6OS08U1o1KOjV"
  },
  {
    "id": "drive-168ViJFD-R4HFpZtcunyaz8DfLCLxjf8y",
    "name": "Remada ao Esterno",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada ao Esterno. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/168ViJFD-R4HFpZtcunyaz8DfLCLxjf8y",
    "thumbnail": "https://lh3.googleusercontent.com/d/168ViJFD-R4HFpZtcunyaz8DfLCLxjf8y",
    "previewUrl": "https://lh3.googleusercontent.com/d/168ViJFD-R4HFpZtcunyaz8DfLCLxjf8y"
  },
  {
    "id": "drive-1pfxOaAyAaQDRWo_Lam3fc4bgyvLjSnIS",
    "name": "Remada Fechada Apoiada no Banco",
    "muscleGroup": "Costas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Remada Fechada Apoiada no Banco. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pfxOaAyAaQDRWo_Lam3fc4bgyvLjSnIS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pfxOaAyAaQDRWo_Lam3fc4bgyvLjSnIS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pfxOaAyAaQDRWo_Lam3fc4bgyvLjSnIS"
  },
  {
    "id": "drive-1yBfeSkniGeEsuOdMUYjQkZYbfayxhwD_",
    "name": "Remada Pegada Fechada",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada Pegada Fechada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yBfeSkniGeEsuOdMUYjQkZYbfayxhwD_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yBfeSkniGeEsuOdMUYjQkZYbfayxhwD_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yBfeSkniGeEsuOdMUYjQkZYbfayxhwD_"
  },
  {
    "id": "drive-1P4s2wRWYpEizmOf1NT6KySROSLgwT1fe",
    "name": "Remada Inclinada com Barra",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Remada Inclinada com Barra. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1P4s2wRWYpEizmOf1NT6KySROSLgwT1fe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1P4s2wRWYpEizmOf1NT6KySROSLgwT1fe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1P4s2wRWYpEizmOf1NT6KySROSLgwT1fe"
  },
  {
    "id": "drive-1qNjeNkNdiaP7-D5FrOo9AVQe0OmiM-zu",
    "name": "Remada Inclinada Pegada Supinada",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada Inclinada Pegada Supinada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qNjeNkNdiaP7-D5FrOo9AVQe0OmiM-zu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qNjeNkNdiaP7-D5FrOo9AVQe0OmiM-zu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qNjeNkNdiaP7-D5FrOo9AVQe0OmiM-zu"
  },
  {
    "id": "drive-1tFkMtpt_nGZcqUnPZFYz6lha5DsfWlVU",
    "name": "Remada na Máquina",
    "muscleGroup": "Costas",
    "equipment": "Máquina",
    "instructions": "Execução de Remada na Máquina. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1tFkMtpt_nGZcqUnPZFYz6lha5DsfWlVU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1tFkMtpt_nGZcqUnPZFYz6lha5DsfWlVU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1tFkMtpt_nGZcqUnPZFYz6lha5DsfWlVU"
  },
  {
    "id": "drive-1WxhxG3n72GgmNyq6z3It95vlj6AW4VIk",
    "name": "Remada na Polia Baixa",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Remada na Polia Baixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WxhxG3n72GgmNyq6z3It95vlj6AW4VIk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WxhxG3n72GgmNyq6z3It95vlj6AW4VIk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WxhxG3n72GgmNyq6z3It95vlj6AW4VIk"
  },
  {
    "id": "drive-11w_XrA9AigLR1N3ShGue9HKudKIzEenu",
    "name": "Remada Invertida (Australiana)",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada Invertida (Australiana). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11w_XrA9AigLR1N3ShGue9HKudKIzEenu",
    "thumbnail": "https://lh3.googleusercontent.com/d/11w_XrA9AigLR1N3ShGue9HKudKIzEenu",
    "previewUrl": "https://lh3.googleusercontent.com/d/11w_XrA9AigLR1N3ShGue9HKudKIzEenu"
  },
  {
    "id": "drive-1LJfcxyDOoYcLxK5GI3GNaX0_Bdo1xA2B",
    "name": "Remada Sentada na Máquina",
    "muscleGroup": "Costas",
    "equipment": "Máquina",
    "instructions": "Execução de Remada Sentada na Máquina. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LJfcxyDOoYcLxK5GI3GNaX0_Bdo1xA2B",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LJfcxyDOoYcLxK5GI3GNaX0_Bdo1xA2B",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LJfcxyDOoYcLxK5GI3GNaX0_Bdo1xA2B"
  },
  {
    "id": "drive-1y8SYgRdCyHUITx_1XHL5MJP2xrIVMuxL",
    "name": "Remada na Máquina Articulada",
    "muscleGroup": "Costas",
    "equipment": "Máquina",
    "instructions": "Execução de Remada na Máquina Articulada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1y8SYgRdCyHUITx_1XHL5MJP2xrIVMuxL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1y8SYgRdCyHUITx_1XHL5MJP2xrIVMuxL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1y8SYgRdCyHUITx_1XHL5MJP2xrIVMuxL"
  },
  {
    "id": "drive-1wQ07k6iLqSKhyM15lyWc-mZQyTWQGBVB",
    "name": "Puxada Alta Pegada Supinada",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Puxada Alta Pegada Supinada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wQ07k6iLqSKhyM15lyWc-mZQyTWQGBVB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wQ07k6iLqSKhyM15lyWc-mZQyTWQGBVB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wQ07k6iLqSKhyM15lyWc-mZQyTWQGBVB"
  },
  {
    "id": "drive-1cgLBnHJ894GIkMmZl8gk0EB_g_yG2aT9",
    "name": "Crucifixo Invertido no Voador (Peck Deck)",
    "muscleGroup": "Costas",
    "equipment": "Máquina",
    "instructions": "Execução de Crucifixo Invertido no Voador (Peck Deck). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1cgLBnHJ894GIkMmZl8gk0EB_g_yG2aT9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1cgLBnHJ894GIkMmZl8gk0EB_g_yG2aT9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1cgLBnHJ894GIkMmZl8gk0EB_g_yG2aT9"
  },
  {
    "id": "drive-1T4mmatbuDNYmu8oZXwl8A9TMUjeeQs8u",
    "name": "Remada Unilateral com Haltere (Serrote)",
    "muscleGroup": "Costas",
    "equipment": "Halteres",
    "instructions": "Execução de Remada Unilateral com Haltere (Serrote). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1T4mmatbuDNYmu8oZXwl8A9TMUjeeQs8u",
    "thumbnail": "https://lh3.googleusercontent.com/d/1T4mmatbuDNYmu8oZXwl8A9TMUjeeQs8u",
    "previewUrl": "https://lh3.googleusercontent.com/d/1T4mmatbuDNYmu8oZXwl8A9TMUjeeQs8u"
  },
  {
    "id": "drive-11QMDwq9zt26J0LP93s2Elkala7jbxp2J",
    "name": "Remada Curvada Unilateral",
    "muscleGroup": "Costas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Remada Curvada Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11QMDwq9zt26J0LP93s2Elkala7jbxp2J",
    "thumbnail": "https://lh3.googleusercontent.com/d/11QMDwq9zt26J0LP93s2Elkala7jbxp2J",
    "previewUrl": "https://lh3.googleusercontent.com/d/11QMDwq9zt26J0LP93s2Elkala7jbxp2J"
  },
  {
    "id": "drive-1KbzfFn8O3lIQ3pnqokgdqdpIqfIOv0ur",
    "name": "Remada Unilateral com Haltere (Serrote) (Variação 2)",
    "muscleGroup": "Costas",
    "equipment": "Halteres",
    "instructions": "Execução de Remada Unilateral com Haltere (Serrote) (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1KbzfFn8O3lIQ3pnqokgdqdpIqfIOv0ur",
    "thumbnail": "https://lh3.googleusercontent.com/d/1KbzfFn8O3lIQ3pnqokgdqdpIqfIOv0ur",
    "previewUrl": "https://lh3.googleusercontent.com/d/1KbzfFn8O3lIQ3pnqokgdqdpIqfIOv0ur"
  },
  {
    "id": "drive-1k5WrLK2LBe3FUbJwRFtfIJ0VUTxn8VWy",
    "name": "Remada em Pé na Polia",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Remada em Pé na Polia. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1k5WrLK2LBe3FUbJwRFtfIJ0VUTxn8VWy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1k5WrLK2LBe3FUbJwRFtfIJ0VUTxn8VWy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1k5WrLK2LBe3FUbJwRFtfIJ0VUTxn8VWy"
  },
  {
    "id": "drive-1DhUSK0eE_GmIkeNUJ1LodCj6ZDkK6nor",
    "name": "Remada Cavalinho na Barra T",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Remada Cavalinho na Barra T. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DhUSK0eE_GmIkeNUJ1LodCj6ZDkK6nor",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DhUSK0eE_GmIkeNUJ1LodCj6ZDkK6nor",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DhUSK0eE_GmIkeNUJ1LodCj6ZDkK6nor"
  },
  {
    "id": "drive-1QjQ3rkQK_Qewgw6i7tU7dY8hpoSpAFeL",
    "name": "Remada Alta na Polia Baixa",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Remada Alta na Polia Baixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QjQ3rkQK_Qewgw6i7tU7dY8hpoSpAFeL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QjQ3rkQK_Qewgw6i7tU7dY8hpoSpAFeL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QjQ3rkQK_Qewgw6i7tU7dY8hpoSpAFeL"
  },
  {
    "id": "drive-1E9tdNhekxMHCqGrXBudOCszzR8Ct1exu",
    "name": "Puxada Alta Pegada Aberta",
    "muscleGroup": "Costas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Puxada Alta Pegada Aberta. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1E9tdNhekxMHCqGrXBudOCszzR8Ct1exu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1E9tdNhekxMHCqGrXBudOCszzR8Ct1exu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1E9tdNhekxMHCqGrXBudOCszzR8Ct1exu"
  },
  {
    "id": "drive-11-otKxIRYVq-VEGAzLdVsjjdFKqDNohN",
    "name": "Remada Yates com Barra",
    "muscleGroup": "Costas",
    "equipment": "Barra",
    "instructions": "Execução de Remada Yates com Barra. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11-otKxIRYVq-VEGAzLdVsjjdFKqDNohN",
    "thumbnail": "https://lh3.googleusercontent.com/d/11-otKxIRYVq-VEGAzLdVsjjdFKqDNohN",
    "previewUrl": "https://lh3.googleusercontent.com/d/11-otKxIRYVq-VEGAzLdVsjjdFKqDNohN"
  },
  {
    "id": "drive-1Cux4LeCJYLmKklp5qePSYXpelhTB4jbl",
    "name": "Apoios Flexionado",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Apoios Flexionado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Cux4LeCJYLmKklp5qePSYXpelhTB4jbl",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Cux4LeCJYLmKklp5qePSYXpelhTB4jbl",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Cux4LeCJYLmKklp5qePSYXpelhTB4jbl"
  },
  {
    "id": "drive-17fVicIV8jg2qQzFcdAXfMJx0ngwE8LwB",
    "name": "Apoios Braços Extendidos",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Apoios Braços Extendidos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17fVicIV8jg2qQzFcdAXfMJx0ngwE8LwB",
    "thumbnail": "https://lh3.googleusercontent.com/d/17fVicIV8jg2qQzFcdAXfMJx0ngwE8LwB",
    "previewUrl": "https://lh3.googleusercontent.com/d/17fVicIV8jg2qQzFcdAXfMJx0ngwE8LwB"
  },
  {
    "id": "drive-1OxOw7D8NaaaOu_g2lKxguUmM0XFcUfjW",
    "name": "Abdutor",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Abdutor. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1OxOw7D8NaaaOu_g2lKxguUmM0XFcUfjW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1OxOw7D8NaaaOu_g2lKxguUmM0XFcUfjW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1OxOw7D8NaaaOu_g2lKxguUmM0XFcUfjW"
  },
  {
    "id": "drive-1871KtWy9yy7iC5P6-COcKMZaTTgmQOQb",
    "name": "Abdução no Abdutor Adutor",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Abdução no Abdutor Adutor. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1871KtWy9yy7iC5P6-COcKMZaTTgmQOQb",
    "thumbnail": "https://lh3.googleusercontent.com/d/1871KtWy9yy7iC5P6-COcKMZaTTgmQOQb",
    "previewUrl": "https://lh3.googleusercontent.com/d/1871KtWy9yy7iC5P6-COcKMZaTTgmQOQb"
  },
  {
    "id": "drive-1RPh_f1g41crSMAuryCuPbfz21bzH8XkB",
    "name": "Abdução Polia Baixa",
    "muscleGroup": "Glúteos",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Abdução Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RPh_f1g41crSMAuryCuPbfz21bzH8XkB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RPh_f1g41crSMAuryCuPbfz21bzH8XkB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RPh_f1g41crSMAuryCuPbfz21bzH8XkB"
  },
  {
    "id": "drive-10p8GNwnTRIccMjdnsh1aioerkMTL2eZI",
    "name": "Agachamento Polia Baixa",
    "muscleGroup": "Glúteos",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Agachamento Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10p8GNwnTRIccMjdnsh1aioerkMTL2eZI",
    "thumbnail": "https://lh3.googleusercontent.com/d/10p8GNwnTRIccMjdnsh1aioerkMTL2eZI",
    "previewUrl": "https://lh3.googleusercontent.com/d/10p8GNwnTRIccMjdnsh1aioerkMTL2eZI"
  },
  {
    "id": "drive-1o5G_I4mfWy3_v359AY4mbj6I-8hVkrlJ",
    "name": "Elevação Pélvica Base B (Unilateral)",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de B Stance Hip Thrust. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1o5G_I4mfWy3_v359AY4mbj6I-8hVkrlJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1o5G_I4mfWy3_v359AY4mbj6I-8hVkrlJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1o5G_I4mfWy3_v359AY4mbj6I-8hVkrlJ"
  },
  {
    "id": "drive-1y8_gzBfHsWjtidfSYX1baDjoK5oBzdz4",
    "name": "Coice para Glúteos com Elástico",
    "muscleGroup": "Glúteos",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Band Donkey Kickback. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1y8_gzBfHsWjtidfSYX1baDjoK5oBzdz4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1y8_gzBfHsWjtidfSYX1baDjoK5oBzdz4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1y8_gzBfHsWjtidfSYX1baDjoK5oBzdz4"
  },
  {
    "id": "drive-1fV-rdVtj3sGX6NPOjB-zxSWIVDgV-1TY",
    "name": "Extensão de Quadril em Pé com Elástico",
    "muscleGroup": "Glúteos",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Band Standing Hip Extensão. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fV-rdVtj3sGX6NPOjB-zxSWIVDgV-1TY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fV-rdVtj3sGX6NPOjB-zxSWIVDgV-1TY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fV-rdVtj3sGX6NPOjB-zxSWIVDgV-1TY"
  },
  {
    "id": "drive-1JJy6b-dk5k0pQiTlWPtqyR46ZStVDLj_",
    "name": "Elevação Pélvica com Barra",
    "muscleGroup": "Glúteos",
    "equipment": "Barra",
    "instructions": "Execução de Barra Hip Thrust. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JJy6b-dk5k0pQiTlWPtqyR46ZStVDLj_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JJy6b-dk5k0pQiTlWPtqyR46ZStVDLj_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JJy6b-dk5k0pQiTlWPtqyR46ZStVDLj_"
  },
  {
    "id": "drive-136sl6VVyif1bF1fAkKIMjFcegrmFDQhz",
    "name": "Elevação Pélvica Peso Corporal",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Bodyweight Hip Thrust. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/136sl6VVyif1bF1fAkKIMjFcegrmFDQhz",
    "thumbnail": "https://lh3.googleusercontent.com/d/136sl6VVyif1bF1fAkKIMjFcegrmFDQhz",
    "previewUrl": "https://lh3.googleusercontent.com/d/136sl6VVyif1bF1fAkKIMjFcegrmFDQhz"
  },
  {
    "id": "drive-1plNOXBLIienN-HDr8pBsZi8lTvYOxuBW",
    "name": "Bom Dia",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Bom Dia. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1plNOXBLIienN-HDr8pBsZi8lTvYOxuBW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1plNOXBLIienN-HDr8pBsZi8lTvYOxuBW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1plNOXBLIienN-HDr8pBsZi8lTvYOxuBW"
  },
  {
    "id": "drive-1yAq5C69jmQk12UsYIjU6elelpLrRIJ-P",
    "name": "Glúteo Coice na Polia Baixa",
    "muscleGroup": "Glúteos",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Kickback. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yAq5C69jmQk12UsYIjU6elelpLrRIJ-P",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yAq5C69jmQk12UsYIjU6elelpLrRIJ-P",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yAq5C69jmQk12UsYIjU6elelpLrRIJ-P"
  },
  {
    "id": "drive-13B3FYPw5-hmHS6SKT2_0U_LjpAj6gQ83",
    "name": "Subida no Caixote (Step Up) na Polia",
    "muscleGroup": "Glúteos",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Step Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13B3FYPw5-hmHS6SKT2_0U_LjpAj6gQ83",
    "thumbnail": "https://lh3.googleusercontent.com/d/13B3FYPw5-hmHS6SKT2_0U_LjpAj6gQ83",
    "previewUrl": "https://lh3.googleusercontent.com/d/13B3FYPw5-hmHS6SKT2_0U_LjpAj6gQ83"
  },
  {
    "id": "drive-1IRTWDZDkOtRUuxh_BDX8X8Lyz3QjMHwZ",
    "name": "Contração Abre e Fecha",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Contração Abre e Fecha. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IRTWDZDkOtRUuxh_BDX8X8Lyz3QjMHwZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IRTWDZDkOtRUuxh_BDX8X8Lyz3QjMHwZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IRTWDZDkOtRUuxh_BDX8X8Lyz3QjMHwZ"
  },
  {
    "id": "drive-1NJPNVZp-ockFcsY1PQXPKIDPAJju3k3F",
    "name": "Ponte de Glúteos com Pés Elevados",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevated Glute Bridge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NJPNVZp-ockFcsY1PQXPKIDPAJju3k3F",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NJPNVZp-ockFcsY1PQXPKIDPAJju3k3F",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NJPNVZp-ockFcsY1PQXPKIDPAJju3k3F"
  },
  {
    "id": "drive-14NM_WIfsHPnN0m6Tjn8PGss0l_SclCMs",
    "name": "Elevaçaõ Pélica com Carga",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevaçaõ Pélica com Carga. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14NM_WIfsHPnN0m6Tjn8PGss0l_SclCMs",
    "thumbnail": "https://lh3.googleusercontent.com/d/14NM_WIfsHPnN0m6Tjn8PGss0l_SclCMs",
    "previewUrl": "https://lh3.googleusercontent.com/d/14NM_WIfsHPnN0m6Tjn8PGss0l_SclCMs"
  },
  {
    "id": "drive-1re6D396gT4H8YN8jTI9hI3eA6yZIt8oc",
    "name": "Elevação de Pelvis Unilateral",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação de Pelvis Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1re6D396gT4H8YN8jTI9hI3eA6yZIt8oc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1re6D396gT4H8YN8jTI9hI3eA6yZIt8oc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1re6D396gT4H8YN8jTI9hI3eA6yZIt8oc"
  },
  {
    "id": "drive-1_aUpeYtAc6kS8MrM8VG_aF9nmkfgLgFq",
    "name": "Elevação Pélvica Apoio Unilateral",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Pélvica Apoio Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_aUpeYtAc6kS8MrM8VG_aF9nmkfgLgFq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_aUpeYtAc6kS8MrM8VG_aF9nmkfgLgFq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_aUpeYtAc6kS8MrM8VG_aF9nmkfgLgFq"
  },
  {
    "id": "drive-1XyjHPXkNkHvuYEY12LLyKSOPAkur3zpK",
    "name": "Elevação Pélvica Smith Machine",
    "muscleGroup": "Glúteos",
    "equipment": "Máquina",
    "instructions": "Execução de Elevação Pélvica Smith Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XyjHPXkNkHvuYEY12LLyKSOPAkur3zpK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XyjHPXkNkHvuYEY12LLyKSOPAkur3zpK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XyjHPXkNkHvuYEY12LLyKSOPAkur3zpK"
  },
  {
    "id": "drive-1vZh6oF71GTSYT4K1g8HWSGE4qPQqdZOG",
    "name": "Elevação Pévica com Barra Apoio das Costas",
    "muscleGroup": "Glúteos",
    "equipment": "Barra",
    "instructions": "Execução de Elevação Pévica com Barra Apoio das Costas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1vZh6oF71GTSYT4K1g8HWSGE4qPQqdZOG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1vZh6oF71GTSYT4K1g8HWSGE4qPQqdZOG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1vZh6oF71GTSYT4K1g8HWSGE4qPQqdZOG"
  },
  {
    "id": "drive-1O7xTq0R3V4uQNQkdeDYh_MclF6jNZ6x3",
    "name": "Elevação Pévica com Barra Apoio dos Pés",
    "muscleGroup": "Glúteos",
    "equipment": "Barra",
    "instructions": "Execução de Elevação Pévica com Barra Apoio dos Pés. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1O7xTq0R3V4uQNQkdeDYh_MclF6jNZ6x3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1O7xTq0R3V4uQNQkdeDYh_MclF6jNZ6x3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1O7xTq0R3V4uQNQkdeDYh_MclF6jNZ6x3"
  },
  {
    "id": "drive-1NtuxwyNx4X3B5qXraxTOzSoqWOSBE9kj",
    "name": "Elevação Pélvica Sapo (Frog Pump)",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Frog Pump. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NtuxwyNx4X3B5qXraxTOzSoqWOSBE9kj",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NtuxwyNx4X3B5qXraxTOzSoqWOSBE9kj",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NtuxwyNx4X3B5qXraxTOzSoqWOSBE9kj"
  },
  {
    "id": "drive-1z4pseLqRdYdt6sT4yfnBbJpDYnDxHoVD",
    "name": "Ponte de Glúteos no Solo",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Glute Bridge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1z4pseLqRdYdt6sT4yfnBbJpDYnDxHoVD",
    "thumbnail": "https://lh3.googleusercontent.com/d/1z4pseLqRdYdt6sT4yfnBbJpDYnDxHoVD",
    "previewUrl": "https://lh3.googleusercontent.com/d/1z4pseLqRdYdt6sT4yfnBbJpDYnDxHoVD"
  },
  {
    "id": "drive-1OIjKb3G___Vgqqf0N6H-mogig3sJYw3m",
    "name": "Extensão Glúteo-Isquiotibiais (GHD)",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Glute Ham Raise Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1OIjKb3G___Vgqqf0N6H-mogig3sJYw3m",
    "thumbnail": "https://lh3.googleusercontent.com/d/1OIjKb3G___Vgqqf0N6H-mogig3sJYw3m",
    "previewUrl": "https://lh3.googleusercontent.com/d/1OIjKb3G___Vgqqf0N6H-mogig3sJYw3m"
  },
  {
    "id": "drive-1-S0Att46Wku5jUU7YjG4eRLkt0md7UbF",
    "name": "Glúteo Polia Baixa",
    "muscleGroup": "Glúteos",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Glúteo Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-S0Att46Wku5jUU7YjG4eRLkt0md7UbF",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-S0Att46Wku5jUU7YjG4eRLkt0md7UbF",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-S0Att46Wku5jUU7YjG4eRLkt0md7UbF"
  },
  {
    "id": "drive-1xUcs0yZUfar6OHYUseFozopLHd1-_oNx",
    "name": "Glúteo 3 Apoios Banco",
    "muscleGroup": "Glúteos",
    "equipment": "Banco",
    "instructions": "Execução de Glúteo 3 Apoios Banco. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xUcs0yZUfar6OHYUseFozopLHd1-_oNx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xUcs0yZUfar6OHYUseFozopLHd1-_oNx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xUcs0yZUfar6OHYUseFozopLHd1-_oNx"
  },
  {
    "id": "drive-1GO6Mepr2LOkScDi3GgEbg1UcYjeHoqON",
    "name": "Glúteo Coice na Máquina",
    "muscleGroup": "Glúteos",
    "equipment": "Máquina",
    "instructions": "Execução de Glúteo Maquina Kick Back. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GO6Mepr2LOkScDi3GgEbg1UcYjeHoqON",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GO6Mepr2LOkScDi3GgEbg1UcYjeHoqON",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GO6Mepr2LOkScDi3GgEbg1UcYjeHoqON"
  },
  {
    "id": "drive-1h7ZPxaZel-UrOgsheXmYr7mFSDNqAe82",
    "name": "Glúteo Máquina em Pé",
    "muscleGroup": "Glúteos",
    "equipment": "Máquina",
    "instructions": "Execução de Glúteo Máquina em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1h7ZPxaZel-UrOgsheXmYr7mFSDNqAe82",
    "thumbnail": "https://lh3.googleusercontent.com/d/1h7ZPxaZel-UrOgsheXmYr7mFSDNqAe82",
    "previewUrl": "https://lh3.googleusercontent.com/d/1h7ZPxaZel-UrOgsheXmYr7mFSDNqAe82"
  },
  {
    "id": "drive-1GxCtMCwksLhZY97qmbt9fU5Bwgm74YUc",
    "name": "Glúteo na Máquina Apoiado",
    "muscleGroup": "Glúteos",
    "equipment": "Máquina",
    "instructions": "Execução de Glúteo na Máquina Apoiado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GxCtMCwksLhZY97qmbt9fU5Bwgm74YUc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GxCtMCwksLhZY97qmbt9fU5Bwgm74YUc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GxCtMCwksLhZY97qmbt9fU5Bwgm74YUc"
  },
  {
    "id": "drive-1-18jW3P-1Z8Iqq2SDmzyaoTPWgOb3Cbp",
    "name": "Glúteo / Elevação no Smith",
    "muscleGroup": "Glúteos",
    "equipment": "Máquina",
    "instructions": "Execução de Glúteo Smith Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-18jW3P-1Z8Iqq2SDmzyaoTPWgOb3Cbp",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-18jW3P-1Z8Iqq2SDmzyaoTPWgOb3Cbp",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-18jW3P-1Z8Iqq2SDmzyaoTPWgOb3Cbp"
  },
  {
    "id": "drive-18dw0ZmWV0jJXWUQBSYRillkfAlfqlyyh",
    "name": "Elevação Pélvica com Calcanhares Elevados",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Heel Elevated Hip Thrust. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18dw0ZmWV0jJXWUQBSYRillkfAlfqlyyh",
    "thumbnail": "https://lh3.googleusercontent.com/d/18dw0ZmWV0jJXWUQBSYRillkfAlfqlyyh",
    "previewUrl": "https://lh3.googleusercontent.com/d/18dw0ZmWV0jJXWUQBSYRillkfAlfqlyyh"
  },
  {
    "id": "drive-1o3-8uxuLe35KahdbioUkpJFei-kykuWR",
    "name": "Extensão de Quadril Ajoelhado",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Kneeling Hip Thrust. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1o3-8uxuLe35KahdbioUkpJFei-kykuWR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1o3-8uxuLe35KahdbioUkpJFei-kykuWR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1o3-8uxuLe35KahdbioUkpJFei-kykuWR"
  },
  {
    "id": "drive-1pIIIBRHly6l2uNDUIYjAJfiowjGitDD7",
    "name": "Flexão de Joelho em Quatro Apoios",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Quadruped Leg Rosca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pIIIBRHly6l2uNDUIYjAJfiowjGitDD7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pIIIBRHly6l2uNDUIYjAJfiowjGitDD7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pIIIBRHly6l2uNDUIYjAJfiowjGitDD7"
  },
  {
    "id": "drive-1BnrbeUa4lfhP_zvLbHHD4t9PDIupDgfu",
    "name": "Ponte de Glúteos Unilateral",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Single Leg Glute Bridge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BnrbeUa4lfhP_zvLbHHD4t9PDIupDgfu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BnrbeUa4lfhP_zvLbHHD4t9PDIupDgfu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BnrbeUa4lfhP_zvLbHHD4t9PDIupDgfu"
  },
  {
    "id": "drive-1e9tO1bRJD_mphWI2zYYFQ7UiBEPhHxha",
    "name": "Elevação Pélvica Unilateral",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Single Leg Hip Thrust Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1e9tO1bRJD_mphWI2zYYFQ7UiBEPhHxha",
    "thumbnail": "https://lh3.googleusercontent.com/d/1e9tO1bRJD_mphWI2zYYFQ7UiBEPhHxha",
    "previewUrl": "https://lh3.googleusercontent.com/d/1e9tO1bRJD_mphWI2zYYFQ7UiBEPhHxha"
  },
  {
    "id": "drive-11wQ6TIt4Mls5UGmdGg8nZPST_5O-wkLH",
    "name": "Stiff Barra Reta",
    "muscleGroup": "Glúteos",
    "equipment": "Barra",
    "instructions": "Execução de Stiff Barra Reta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11wQ6TIt4Mls5UGmdGg8nZPST_5O-wkLH",
    "thumbnail": "https://lh3.googleusercontent.com/d/11wQ6TIt4Mls5UGmdGg8nZPST_5O-wkLH",
    "previewUrl": "https://lh3.googleusercontent.com/d/11wQ6TIt4Mls5UGmdGg8nZPST_5O-wkLH"
  },
  {
    "id": "drive-1IpmeEAczxBSGulFP2K4Rm_VKYMMo8l59",
    "name": "Stiff com Barra",
    "muscleGroup": "Glúteos",
    "equipment": "Barra",
    "instructions": "Execução de Stiff Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IpmeEAczxBSGulFP2K4Rm_VKYMMo8l59",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IpmeEAczxBSGulFP2K4Rm_VKYMMo8l59",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IpmeEAczxBSGulFP2K4Rm_VKYMMo8l59"
  },
  {
    "id": "drive-1tcQ6nnFMx2ow5XMoU4DigZ2-MtlFZ11M",
    "name": "Stiff Flexionado Barra",
    "muscleGroup": "Glúteos",
    "equipment": "Barra",
    "instructions": "Execução de Stiff Flexionado Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1tcQ6nnFMx2ow5XMoU4DigZ2-MtlFZ11M",
    "thumbnail": "https://lh3.googleusercontent.com/d/1tcQ6nnFMx2ow5XMoU4DigZ2-MtlFZ11M",
    "previewUrl": "https://lh3.googleusercontent.com/d/1tcQ6nnFMx2ow5XMoU4DigZ2-MtlFZ11M"
  },
  {
    "id": "drive-10QUFypsCMlZi-VKGDAx5P-1cTPuxbI_m",
    "name": "Stiff Flexionado Carga",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Stiff Flexionado Carga. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10QUFypsCMlZi-VKGDAx5P-1cTPuxbI_m",
    "thumbnail": "https://lh3.googleusercontent.com/d/10QUFypsCMlZi-VKGDAx5P-1cTPuxbI_m",
    "previewUrl": "https://lh3.googleusercontent.com/d/10QUFypsCMlZi-VKGDAx5P-1cTPuxbI_m"
  },
  {
    "id": "drive-13gvlXQu2ZRr2fYLqx_VmETAKNT5K3mMN",
    "name": "Stiff Flexionado Halteres",
    "muscleGroup": "Glúteos",
    "equipment": "Halteres",
    "instructions": "Execução de Stiff Flexionado Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13gvlXQu2ZRr2fYLqx_VmETAKNT5K3mMN",
    "thumbnail": "https://lh3.googleusercontent.com/d/13gvlXQu2ZRr2fYLqx_VmETAKNT5K3mMN",
    "previewUrl": "https://lh3.googleusercontent.com/d/13gvlXQu2ZRr2fYLqx_VmETAKNT5K3mMN"
  },
  {
    "id": "drive-1dLhL3v432Nd-KVb-CU7EPtI6egnWjGcO",
    "name": "Stiff Smith Machine",
    "muscleGroup": "Glúteos",
    "equipment": "Máquina",
    "instructions": "Execução de Stiff Smith Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dLhL3v432Nd-KVb-CU7EPtI6egnWjGcO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dLhL3v432Nd-KVb-CU7EPtI6egnWjGcO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dLhL3v432Nd-KVb-CU7EPtI6egnWjGcO"
  },
  {
    "id": "drive-1oYxV3P35qHgfgV9uYe1jj4s6wePmt_J3",
    "name": "Ponte de Glúteos com Pernas Estendidas",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Straight Leg Glute Bridge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1oYxV3P35qHgfgV9uYe1jj4s6wePmt_J3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1oYxV3P35qHgfgV9uYe1jj4s6wePmt_J3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1oYxV3P35qHgfgV9uYe1jj4s6wePmt_J3"
  },
  {
    "id": "drive-1M_CFUMR_FiHwYGTHB4kg0t67XPBwam7h",
    "name": "Sumô Barra",
    "muscleGroup": "Glúteos",
    "equipment": "Barra",
    "instructions": "Execução de Sumô Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1M_CFUMR_FiHwYGTHB4kg0t67XPBwam7h",
    "thumbnail": "https://lh3.googleusercontent.com/d/1M_CFUMR_FiHwYGTHB4kg0t67XPBwam7h",
    "previewUrl": "https://lh3.googleusercontent.com/d/1M_CFUMR_FiHwYGTHB4kg0t67XPBwam7h"
  },
  {
    "id": "drive-1grhIe0v1KxYgjBGnb2pfwtwkwdE5UlLU",
    "name": "Agachamento Sumô com Haltere",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Sumô Dumbell. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1grhIe0v1KxYgjBGnb2pfwtwkwdE5UlLU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1grhIe0v1KxYgjBGnb2pfwtwkwdE5UlLU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1grhIe0v1KxYgjBGnb2pfwtwkwdE5UlLU"
  },
  {
    "id": "drive-1Di6-CcXf-CdfTU522PCi_ZaW9MaV_ejt",
    "name": "Agachamento Sumô Frontal",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Sumô Front. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Di6-CcXf-CdfTU522PCi_ZaW9MaV_ejt",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Di6-CcXf-CdfTU522PCi_ZaW9MaV_ejt",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Di6-CcXf-CdfTU522PCi_ZaW9MaV_ejt"
  },
  {
    "id": "drive-1EocHEEL0_SQtxRHyKXfpi_kcnAg3GhbW",
    "name": "Ponte de Glúteos em Mesa",
    "muscleGroup": "Glúteos",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Table Top Glute Bridge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1EocHEEL0_SQtxRHyKXfpi_kcnAg3GhbW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1EocHEEL0_SQtxRHyKXfpi_kcnAg3GhbW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1EocHEEL0_SQtxRHyKXfpi_kcnAg3GhbW"
  },
  {
    "id": "drive-18BrzRlXqHB0xT4Vgwpm0Zr1h4-6dVGVF",
    "name": "Abdutor Máquina",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Abdutor Máquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18BrzRlXqHB0xT4Vgwpm0Zr1h4-6dVGVF",
    "thumbnail": "https://lh3.googleusercontent.com/d/18BrzRlXqHB0xT4Vgwpm0Zr1h4-6dVGVF",
    "previewUrl": "https://lh3.googleusercontent.com/d/18BrzRlXqHB0xT4Vgwpm0Zr1h4-6dVGVF"
  },
  {
    "id": "drive-1o_6cStJ9BmmyyaoTS7h5mXDGZv3W9pcv",
    "name": "Adutor Maquina",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Adutor Maquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1o_6cStJ9BmmyyaoTS7h5mXDGZv3W9pcv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1o_6cStJ9BmmyyaoTS7h5mXDGZv3W9pcv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1o_6cStJ9BmmyyaoTS7h5mXDGZv3W9pcv"
  },
  {
    "id": "drive-1BRgS2_P_V7RrutWmU1SO2P6C-1JY1e5B",
    "name": "Adutor na Polia Baixa",
    "muscleGroup": "Pernas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Adutor na Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BRgS2_P_V7RrutWmU1SO2P6C-1JY1e5B",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BRgS2_P_V7RrutWmU1SO2P6C-1JY1e5B",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BRgS2_P_V7RrutWmU1SO2P6C-1JY1e5B"
  },
  {
    "id": "drive-11HQvR_rq_ykG5irZjeHPZoZizMUop_sv",
    "name": "Adutor Tesoura",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Adutor Tesoura. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11HQvR_rq_ykG5irZjeHPZoZizMUop_sv",
    "thumbnail": "https://lh3.googleusercontent.com/d/11HQvR_rq_ykG5irZjeHPZoZizMUop_sv",
    "previewUrl": "https://lh3.googleusercontent.com/d/11HQvR_rq_ykG5irZjeHPZoZizMUop_sv"
  },
  {
    "id": "drive-1lea1gnKBTi9DTi3RqI70-49OH-AGiZEH",
    "name": "Adutor",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Adutor. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lea1gnKBTi9DTi3RqI70-49OH-AGiZEH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lea1gnKBTi9DTi3RqI70-49OH-AGiZEH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lea1gnKBTi9DTi3RqI70-49OH-AGiZEH"
  },
  {
    "id": "drive-1qPItWwylIqaSz5iwVcIn_gDFo9ssCEIZ",
    "name": "Afundo Caminhada",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Afundo Caminhada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qPItWwylIqaSz5iwVcIn_gDFo9ssCEIZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qPItWwylIqaSz5iwVcIn_gDFo9ssCEIZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qPItWwylIqaSz5iwVcIn_gDFo9ssCEIZ"
  },
  {
    "id": "drive-1I_1N6Aw3e7JY7AhLGcWEpOlztm5Y3MQ-",
    "name": "Afundo com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Afundo com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I_1N6Aw3e7JY7AhLGcWEpOlztm5Y3MQ-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I_1N6Aw3e7JY7AhLGcWEpOlztm5Y3MQ-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I_1N6Aw3e7JY7AhLGcWEpOlztm5Y3MQ-"
  },
  {
    "id": "drive-1Q8PFfWELTMEZShJzyfE6PtINCG6q8rkw",
    "name": "Afundo Inclinado",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Afundo Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Q8PFfWELTMEZShJzyfE6PtINCG6q8rkw",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Q8PFfWELTMEZShJzyfE6PtINCG6q8rkw",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Q8PFfWELTMEZShJzyfE6PtINCG6q8rkw"
  },
  {
    "id": "drive-1qOaeYifwsFB4PxFstmkWfqSMUzrMYua0",
    "name": "Afundo Lateralizado",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Afundo Lateralizado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qOaeYifwsFB4PxFstmkWfqSMUzrMYua0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qOaeYifwsFB4PxFstmkWfqSMUzrMYua0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qOaeYifwsFB4PxFstmkWfqSMUzrMYua0"
  },
  {
    "id": "drive-1vup-nD_NeaIBBYDysyd1hi_R8NeUJaMB",
    "name": "Afundo no Smith",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Afundo Smith Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1vup-nD_NeaIBBYDysyd1hi_R8NeUJaMB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1vup-nD_NeaIBBYDysyd1hi_R8NeUJaMB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1vup-nD_NeaIBBYDysyd1hi_R8NeUJaMB"
  },
  {
    "id": "drive-1LZfsvQKnWriweLulUeMBIvRO-qjbG6nb",
    "name": "Agachamento Frontal",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Front. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LZfsvQKnWriweLulUeMBIvRO-qjbG6nb",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LZfsvQKnWriweLulUeMBIvRO-qjbG6nb",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LZfsvQKnWriweLulUeMBIvRO-qjbG6nb"
  },
  {
    "id": "drive-1Sa_aXuNSLRCBPR1-8CUWNmVsQEd06Vet",
    "name": "Agachamento Bola",
    "muscleGroup": "Pernas",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Agachamento Bola. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Sa_aXuNSLRCBPR1-8CUWNmVsQEd06Vet",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Sa_aXuNSLRCBPR1-8CUWNmVsQEd06Vet",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Sa_aXuNSLRCBPR1-8CUWNmVsQEd06Vet"
  },
  {
    "id": "drive-1Hv8cot9meXIIiUoAoUolPcxZua_ln6OS",
    "name": "Agachamento com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Agachamento com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Hv8cot9meXIIiUoAoUolPcxZua_ln6OS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Hv8cot9meXIIiUoAoUolPcxZua_ln6OS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Hv8cot9meXIIiUoAoUolPcxZua_ln6OS"
  },
  {
    "id": "drive-17qfhKTRMRw8qG4iciHhqV1M2wVHObr06",
    "name": "Agachamento com Subida no Banco",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento com Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17qfhKTRMRw8qG4iciHhqV1M2wVHObr06",
    "thumbnail": "https://lh3.googleusercontent.com/d/17qfhKTRMRw8qG4iciHhqV1M2wVHObr06",
    "previewUrl": "https://lh3.googleusercontent.com/d/17qfhKTRMRw8qG4iciHhqV1M2wVHObr06"
  },
  {
    "id": "drive-1HIQyuTFx-cWEemNm_iVZHs4O6aGQruBE",
    "name": "Agachamento Frontal com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Agachamento Frontal com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HIQyuTFx-cWEemNm_iVZHs4O6aGQruBE",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HIQyuTFx-cWEemNm_iVZHs4O6aGQruBE",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HIQyuTFx-cWEemNm_iVZHs4O6aGQruBE"
  },
  {
    "id": "drive-1QQxJoU2FEQoKJt1ZNRi1uDzmo2qVjn5e",
    "name": "Agachamento Frontal Gaiola",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Frontal Gaiola. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QQxJoU2FEQoKJt1ZNRi1uDzmo2qVjn5e",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QQxJoU2FEQoKJt1ZNRi1uDzmo2qVjn5e",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QQxJoU2FEQoKJt1ZNRi1uDzmo2qVjn5e"
  },
  {
    "id": "drive-1lvuGJ3LvBQagLQ2DMa9nLD3v9wXkGThh",
    "name": "Agachamento Havaiano",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Havaiano. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lvuGJ3LvBQagLQ2DMa9nLD3v9wXkGThh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lvuGJ3LvBQagLQ2DMa9nLD3v9wXkGThh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lvuGJ3LvBQagLQ2DMa9nLD3v9wXkGThh"
  },
  {
    "id": "drive-1owYZOhSxsvl-7Jgzg9tTbU5THVHVTC27",
    "name": "Agachamento Máquina",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Agachamento Máquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1owYZOhSxsvl-7Jgzg9tTbU5THVHVTC27",
    "thumbnail": "https://lh3.googleusercontent.com/d/1owYZOhSxsvl-7Jgzg9tTbU5THVHVTC27",
    "previewUrl": "https://lh3.googleusercontent.com/d/1owYZOhSxsvl-7Jgzg9tTbU5THVHVTC27"
  },
  {
    "id": "drive-17egRltQFYTKepZBCZok7GMKBjl7Zoft-",
    "name": "Agachamento Pendulo",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Pendulo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17egRltQFYTKepZBCZok7GMKBjl7Zoft-",
    "thumbnail": "https://lh3.googleusercontent.com/d/17egRltQFYTKepZBCZok7GMKBjl7Zoft-",
    "previewUrl": "https://lh3.googleusercontent.com/d/17egRltQFYTKepZBCZok7GMKBjl7Zoft-"
  },
  {
    "id": "drive-1I96l8he5jj-cYfiIt0cwLaVsysdGdo08",
    "name": "Agachamento Pistola Uni",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Pistola Uni. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I96l8he5jj-cYfiIt0cwLaVsysdGdo08",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I96l8he5jj-cYfiIt0cwLaVsysdGdo08",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I96l8he5jj-cYfiIt0cwLaVsysdGdo08"
  },
  {
    "id": "drive-1FGBzntv-7dA-FbIoKnp6f_bjQJdYbQjq",
    "name": "Agachamento Pistola",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Pistola. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FGBzntv-7dA-FbIoKnp6f_bjQJdYbQjq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FGBzntv-7dA-FbIoKnp6f_bjQJdYbQjq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FGBzntv-7dA-FbIoKnp6f_bjQJdYbQjq"
  },
  {
    "id": "drive-1_i5hgkJ8DFSBVssdl-Z6d33hjbqptK5P",
    "name": "Agachamento Polia Baixa (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Agachamento Polia Baixa (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_i5hgkJ8DFSBVssdl-Z6d33hjbqptK5P",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_i5hgkJ8DFSBVssdl-Z6d33hjbqptK5P",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_i5hgkJ8DFSBVssdl-Z6d33hjbqptK5P"
  },
  {
    "id": "drive-1hmEXNLX3ikWuDo4mfSjGZ2cnP6NQ3McG",
    "name": "Agachamento Reverso",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Reverso. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hmEXNLX3ikWuDo4mfSjGZ2cnP6NQ3McG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hmEXNLX3ikWuDo4mfSjGZ2cnP6NQ3McG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hmEXNLX3ikWuDo4mfSjGZ2cnP6NQ3McG"
  },
  {
    "id": "drive-1VriDRFwSsvK4x8Yev-RtYNjMWOuWAS4h",
    "name": "Agachamento Sumô com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Agachamento Sumô com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VriDRFwSsvK4x8Yev-RtYNjMWOuWAS4h",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VriDRFwSsvK4x8Yev-RtYNjMWOuWAS4h",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VriDRFwSsvK4x8Yev-RtYNjMWOuWAS4h"
  },
  {
    "id": "drive-1JZKYwpwKgWE2D-UIW02ZStIfHKZ_YOPY",
    "name": "Agachamento Sumô Pilé",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Sumô Pilé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JZKYwpwKgWE2D-UIW02ZStIfHKZ_YOPY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JZKYwpwKgWE2D-UIW02ZStIfHKZ_YOPY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JZKYwpwKgWE2D-UIW02ZStIfHKZ_YOPY"
  },
  {
    "id": "drive-1ZX1B3b3V7-ejda-x9Kg-GSeU6BJJ5vs9",
    "name": "Agachamento Zercher",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Zercher. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZX1B3b3V7-ejda-x9Kg-GSeU6BJJ5vs9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZX1B3b3V7-ejda-x9Kg-GSeU6BJJ5vs9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZX1B3b3V7-ejda-x9Kg-GSeU6BJJ5vs9"
  },
  {
    "id": "drive-1ZhxMFmS3tcq-g-2lo1vxBbHhKMv4N9jX",
    "name": "Alavanca de Abdção",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alavanca de Abdção. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZhxMFmS3tcq-g-2lo1vxBbHhKMv4N9jX",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZhxMFmS3tcq-g-2lo1vxBbHhKMv4N9jX",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZhxMFmS3tcq-g-2lo1vxBbHhKMv4N9jX"
  },
  {
    "id": "drive-1FKn-te2S4P5Udnuf0Umdc-2ygplyiq5h",
    "name": "Avanço",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Avanço. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FKn-te2S4P5Udnuf0Umdc-2ygplyiq5h",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FKn-te2S4P5Udnuf0Umdc-2ygplyiq5h",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FKn-te2S4P5Udnuf0Umdc-2ygplyiq5h"
  },
  {
    "id": "drive-1Fo7n_YKQIV7ncIKZqLvoSIZzUl7Z5uaN",
    "name": "Arremesso (Power Clean) com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Clean. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Fo7n_YKQIV7ncIKZqLvoSIZzUl7Z5uaN",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Fo7n_YKQIV7ncIKZqLvoSIZzUl7Z5uaN",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Fo7n_YKQIV7ncIKZqLvoSIZzUl7Z5uaN"
  },
  {
    "id": "drive-1EVo67IXoCcb4T7lbaX0DPc-DfX6gGtqp",
    "name": "Barra Lateral",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Lateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1EVo67IXoCcb4T7lbaX0DPc-DfX6gGtqp",
    "thumbnail": "https://lh3.googleusercontent.com/d/1EVo67IXoCcb4T7lbaX0DPc-DfX6gGtqp",
    "previewUrl": "https://lh3.googleusercontent.com/d/1EVo67IXoCcb4T7lbaX0DPc-DfX6gGtqp"
  },
  {
    "id": "drive-1spYmFk7nD5QKomjWf5aOQiSAJ1Zu3GrZ",
    "name": "Afundo com Barra (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Afundo com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1spYmFk7nD5QKomjWf5aOQiSAJ1Zu3GrZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1spYmFk7nD5QKomjWf5aOQiSAJ1Zu3GrZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1spYmFk7nD5QKomjWf5aOQiSAJ1Zu3GrZ"
  },
  {
    "id": "drive-1kVWuxv62i1Nk2xkUN8FWRt8eHWxNiCBY",
    "name": "Subida no Banco (Step Up) com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Step Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kVWuxv62i1Nk2xkUN8FWRt8eHWxNiCBY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kVWuxv62i1Nk2xkUN8FWRt8eHWxNiCBY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kVWuxv62i1Nk2xkUN8FWRt8eHWxNiCBY"
  },
  {
    "id": "drive-10BJJL0_YwXu47nWV1ZrbqsjIv_vsx_Fo",
    "name": "Bom Dia (Good Morning) com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Good Morning. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10BJJL0_YwXu47nWV1ZrbqsjIv_vsx_Fo",
    "thumbnail": "https://lh3.googleusercontent.com/d/10BJJL0_YwXu47nWV1ZrbqsjIv_vsx_Fo",
    "previewUrl": "https://lh3.googleusercontent.com/d/10BJJL0_YwXu47nWV1ZrbqsjIv_vsx_Fo"
  },
  {
    "id": "drive-1EANVdwm_hfQej8ZUKUDCkSG-GSmOVjQc",
    "name": "Levantamento Terra Romeno (RDL) com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Romanian Levantamento Terra Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1EANVdwm_hfQej8ZUKUDCkSG-GSmOVjQc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1EANVdwm_hfQej8ZUKUDCkSG-GSmOVjQc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1EANVdwm_hfQej8ZUKUDCkSG-GSmOVjQc"
  },
  {
    "id": "drive-1mGoPS22U4hYwpKGMVLQZGsycpk94OPtG",
    "name": "Caminhada do Fazendeiro (Farmer Walk)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Benefits Of Farmers Walks. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mGoPS22U4hYwpKGMVLQZGsycpk94OPtG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mGoPS22U4hYwpKGMVLQZGsycpk94OPtG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mGoPS22U4hYwpKGMVLQZGsycpk94OPtG"
  },
  {
    "id": "drive-19Ns2wkxgmuM8YaX_KY5ATlYtASIwWiMb",
    "name": "Bom Dia com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Bom Dia com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19Ns2wkxgmuM8YaX_KY5ATlYtASIwWiMb",
    "thumbnail": "https://lh3.googleusercontent.com/d/19Ns2wkxgmuM8YaX_KY5ATlYtASIwWiMb",
    "previewUrl": "https://lh3.googleusercontent.com/d/19Ns2wkxgmuM8YaX_KY5ATlYtASIwWiMb"
  },
  {
    "id": "drive-1HA7ZjXfTkrThJAls2H9JgIzXGCRQUsGU",
    "name": "Bom Dia com Halter",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Bom Dia com Halter. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HA7ZjXfTkrThJAls2H9JgIzXGCRQUsGU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HA7ZjXfTkrThJAls2H9JgIzXGCRQUsGU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HA7ZjXfTkrThJAls2H9JgIzXGCRQUsGU"
  },
  {
    "id": "drive-1mb7wqs1Uc74xAe1j7sAxs1btHuoqDuAm",
    "name": "Agachamento Búlgaro",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Bulgarian Split Spuat. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mb7wqs1Uc74xAe1j7sAxs1btHuoqDuAm",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mb7wqs1Uc74xAe1j7sAxs1btHuoqDuAm",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mb7wqs1Uc74xAe1j7sAxs1btHuoqDuAm"
  },
  {
    "id": "drive-16rZdBXDWjst8oiDNTT8Exx8plR4Q7J2T",
    "name": "Búlgaro com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Búlgaro com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/16rZdBXDWjst8oiDNTT8Exx8plR4Q7J2T",
    "thumbnail": "https://lh3.googleusercontent.com/d/16rZdBXDWjst8oiDNTT8Exx8plR4Q7J2T",
    "previewUrl": "https://lh3.googleusercontent.com/d/16rZdBXDWjst8oiDNTT8Exx8plR4Q7J2T"
  },
  {
    "id": "drive-1WAy8XJIQ-VtUDI8wqyT2QxicHMP-P8To",
    "name": "Búlgaro com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Búlgaro com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WAy8XJIQ-VtUDI8wqyT2QxicHMP-P8To",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WAy8XJIQ-VtUDI8wqyT2QxicHMP-P8To",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WAy8XJIQ-VtUDI8wqyT2QxicHMP-P8To"
  },
  {
    "id": "drive-1BkC8kHBhHjLeEnAjOKzPmj2r0JnhuNQc",
    "name": "Búlgaro",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Búlgaro. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BkC8kHBhHjLeEnAjOKzPmj2r0JnhuNQc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BkC8kHBhHjLeEnAjOKzPmj2r0JnhuNQc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BkC8kHBhHjLeEnAjOKzPmj2r0JnhuNQc"
  },
  {
    "id": "drive-1PAnmIM52_mJDzU8NoST2PmGxigLY0VLn",
    "name": "Cadeirinha",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Cadeirinha. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PAnmIM52_mJDzU8NoST2PmGxigLY0VLn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PAnmIM52_mJDzU8NoST2PmGxigLY0VLn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PAnmIM52_mJDzU8NoST2PmGxigLY0VLn"
  },
  {
    "id": "drive-1M3K9mzA7amrnIMKRAad-HQsU5LaaNk5D",
    "name": "Dead Lift",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Dead Lift. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1M3K9mzA7amrnIMKRAad-HQsU5LaaNk5D",
    "thumbnail": "https://lh3.googleusercontent.com/d/1M3K9mzA7amrnIMKRAad-HQsU5LaaNk5D",
    "previewUrl": "https://lh3.googleusercontent.com/d/1M3K9mzA7amrnIMKRAad-HQsU5LaaNk5D"
  },
  {
    "id": "drive-1_jtz9E4JIe6rzckB3deUDSjP0-lya7Rf",
    "name": "Bom Dia (Good Morning) com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Good Morning. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_jtz9E4JIe6rzckB3deUDSjP0-lya7Rf",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_jtz9E4JIe6rzckB3deUDSjP0-lya7Rf",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_jtz9E4JIe6rzckB3deUDSjP0-lya7Rf"
  },
  {
    "id": "drive-1ksr1dsKwIbdT7YSoHltXABYKf2DFt8wO",
    "name": "Stiff com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Stiff Leg Levantamento Terra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ksr1dsKwIbdT7YSoHltXABYKf2DFt8wO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ksr1dsKwIbdT7YSoHltXABYKf2DFt8wO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ksr1dsKwIbdT7YSoHltXABYKf2DFt8wO"
  },
  {
    "id": "drive-1RuYVy0GYsaGR90JbugGGMAWY9lDsPTDF",
    "name": "Extensor de Joelhos",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Extensor de Joelhos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RuYVy0GYsaGR90JbugGGMAWY9lDsPTDF",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RuYVy0GYsaGR90JbugGGMAWY9lDsPTDF",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RuYVy0GYsaGR90JbugGGMAWY9lDsPTDF"
  },
  {
    "id": "drive-1gUGlFCdQBLwPwXQdyTIsNWOi0Xx87vix",
    "name": "Extensão de Joelhos",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Extensão de Joelhos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gUGlFCdQBLwPwXQdyTIsNWOi0Xx87vix",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gUGlFCdQBLwPwXQdyTIsNWOi0Xx87vix",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gUGlFCdQBLwPwXQdyTIsNWOi0Xx87vix"
  },
  {
    "id": "drive-1-MCQ0evUhcraYW4s-RJ4KoJPqjZGHiS5",
    "name": "Extensão Polia",
    "muscleGroup": "Pernas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Extensão Polia. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-MCQ0evUhcraYW4s-RJ4KoJPqjZGHiS5",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-MCQ0evUhcraYW4s-RJ4KoJPqjZGHiS5",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-MCQ0evUhcraYW4s-RJ4KoJPqjZGHiS5"
  },
  {
    "id": "drive-1BMftn5aX3fWTpbKgmHv6fvVMmIKjzd-F",
    "name": "Extensão Unilateral",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Extensão Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BMftn5aX3fWTpbKgmHv6fvVMmIKjzd-F",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BMftn5aX3fWTpbKgmHv6fvVMmIKjzd-F",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BMftn5aX3fWTpbKgmHv6fvVMmIKjzd-F"
  },
  {
    "id": "drive-1MLALS2n1PbhEnI9guhbdFNipd8QoCeiG",
    "name": "Flexão Alta Polia",
    "muscleGroup": "Pernas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Flexão Alta Polia. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MLALS2n1PbhEnI9guhbdFNipd8QoCeiG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MLALS2n1PbhEnI9guhbdFNipd8QoCeiG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MLALS2n1PbhEnI9guhbdFNipd8QoCeiG"
  },
  {
    "id": "drive-1wib5jrksn5eMa5pxYLodI3ya1R23Gnjx",
    "name": "Flexora em Pé Unilateral",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Flexora em Pé Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wib5jrksn5eMa5pxYLodI3ya1R23Gnjx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wib5jrksn5eMa5pxYLodI3ya1R23Gnjx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wib5jrksn5eMa5pxYLodI3ya1R23Gnjx"
  },
  {
    "id": "drive-1kJVXfhlCPR-0WO9SqkFqdn3YWMMeoMJ6",
    "name": "Mesa Flexora Deitado",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Mesa Flexora Deitado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kJVXfhlCPR-0WO9SqkFqdn3YWMMeoMJ6",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kJVXfhlCPR-0WO9SqkFqdn3YWMMeoMJ6",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kJVXfhlCPR-0WO9SqkFqdn3YWMMeoMJ6"
  },
  {
    "id": "drive-1m4mtMH3nzQKMcAPjsxbGlWw8QGh93_Ye",
    "name": "Cadeira Flexora Sentada",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Cadeira Flexora Sentada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1m4mtMH3nzQKMcAPjsxbGlWw8QGh93_Ye",
    "thumbnail": "https://lh3.googleusercontent.com/d/1m4mtMH3nzQKMcAPjsxbGlWw8QGh93_Ye",
    "previewUrl": "https://lh3.googleusercontent.com/d/1m4mtMH3nzQKMcAPjsxbGlWw8QGh93_Ye"
  },
  {
    "id": "drive-1IFlrWrxUV8Hz7GxIdMlqWXFGTSD2G5f_",
    "name": "Flexora Deitado na Polia",
    "muscleGroup": "Pernas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Flexora Deitado na Polia. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IFlrWrxUV8Hz7GxIdMlqWXFGTSD2G5f_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IFlrWrxUV8Hz7GxIdMlqWXFGTSD2G5f_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IFlrWrxUV8Hz7GxIdMlqWXFGTSD2G5f_"
  },
  {
    "id": "drive-1VGtM35EzI4HUaikNcrrzJnvsKQa84GQI",
    "name": "Mesa Flexora Unilateral Deitado",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Mesa Flexora Unilateral Deitado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VGtM35EzI4HUaikNcrrzJnvsKQa84GQI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VGtM35EzI4HUaikNcrrzJnvsKQa84GQI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VGtM35EzI4HUaikNcrrzJnvsKQa84GQI"
  },
  {
    "id": "drive-1xTgLpevT7dON85lbgIlr9_Y3HZ_qVeNH",
    "name": "Extensão/Flexão de Quadril na Polia",
    "muscleGroup": "Pernas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Extensão/Flexão de Quadril na Polia. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xTgLpevT7dON85lbgIlr9_Y3HZ_qVeNH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xTgLpevT7dON85lbgIlr9_Y3HZ_qVeNH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xTgLpevT7dON85lbgIlr9_Y3HZ_qVeNH"
  },
  {
    "id": "drive-1jJSf86t-7OSA4Bbjdwd35ZvD2bli_hBD",
    "name": "Flexora Ajoelhado Unilateral",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Flexora Ajoelhado Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jJSf86t-7OSA4Bbjdwd35ZvD2bli_hBD",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jJSf86t-7OSA4Bbjdwd35ZvD2bli_hBD",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jJSf86t-7OSA4Bbjdwd35ZvD2bli_hBD"
  },
  {
    "id": "drive-1QbUnMLZ2_tRF6CjUu5HzwUW3gDwGwvJ3",
    "name": "Flexora Unilateral na Máquina",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Flexora Unilateral na Máquina. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QbUnMLZ2_tRF6CjUu5HzwUW3gDwGwvJ3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QbUnMLZ2_tRF6CjUu5HzwUW3gDwGwvJ3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QbUnMLZ2_tRF6CjUu5HzwUW3gDwGwvJ3"
  },
  {
    "id": "drive-1m3V3yyMJShap_x16qsH3d7ir5N2Q9Pky",
    "name": "Agachamento Frontal com Barra (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Agachamento Frontal com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1m3V3yyMJShap_x16qsH3d7ir5N2Q9Pky",
    "thumbnail": "https://lh3.googleusercontent.com/d/1m3V3yyMJShap_x16qsH3d7ir5N2Q9Pky",
    "previewUrl": "https://lh3.googleusercontent.com/d/1m3V3yyMJShap_x16qsH3d7ir5N2Q9Pky"
  },
  {
    "id": "drive-1ZKlUcnsLf9XG7bFA5HnLG4yNgrB4t711",
    "name": "Cadeira Extensora",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Cadeira Extensora. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZKlUcnsLf9XG7bFA5HnLG4yNgrB4t711",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZKlUcnsLf9XG7bFA5HnLG4yNgrB4t711",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZKlUcnsLf9XG7bFA5HnLG4yNgrB4t711"
  },
  {
    "id": "drive-1NuUFXsc-Ws9l8iJ4CLL9Cqy5Ok-elcX1",
    "name": "Subida Lateral no Caixote (Step Up)",
    "muscleGroup": "Pernas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Subida Lateral no Caixote (Step Up). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NuUFXsc-Ws9l8iJ4CLL9Cqy5Ok-elcX1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NuUFXsc-Ws9l8iJ4CLL9Cqy5Ok-elcX1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NuUFXsc-Ws9l8iJ4CLL9Cqy5Ok-elcX1"
  },
  {
    "id": "drive-1W5R6wrlzu1LUQTEBMqDmrFQMfO1UIXDA",
    "name": "Leg Press 45° com Abdução",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Leg Press 45° com Abdução. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1W5R6wrlzu1LUQTEBMqDmrFQMfO1UIXDA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1W5R6wrlzu1LUQTEBMqDmrFQMfO1UIXDA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1W5R6wrlzu1LUQTEBMqDmrFQMfO1UIXDA"
  },
  {
    "id": "drive-1Gq-ab2VJymTsaWq3cMI2hto8gqgFGcoZ",
    "name": "Leg Press Horizontal",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Leg Press Horizontal. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Gq-ab2VJymTsaWq3cMI2hto8gqgFGcoZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Gq-ab2VJymTsaWq3cMI2hto8gqgFGcoZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Gq-ab2VJymTsaWq3cMI2hto8gqgFGcoZ"
  },
  {
    "id": "drive-1BS-u2U_CIxeMBaxaaZi9OGcXNMhoinec",
    "name": "Leg Press Vertical no Smith",
    "muscleGroup": "Pernas",
    "equipment": "Máquina Smith",
    "instructions": "Execução de Leg Press Vertical no Smith. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BS-u2U_CIxeMBaxaaZi9OGcXNMhoinec",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BS-u2U_CIxeMBaxaaZi9OGcXNMhoinec",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BS-u2U_CIxeMBaxaaZi9OGcXNMhoinec"
  },
  {
    "id": "drive-1aqZ0DQ-K5HJHNJBG_0VagYIJxhjZYyUT",
    "name": "Leg Press Unilateral",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Leg Press Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aqZ0DQ-K5HJHNJBG_0VagYIJxhjZYyUT",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aqZ0DQ-K5HJHNJBG_0VagYIJxhjZYyUT",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aqZ0DQ-K5HJHNJBG_0VagYIJxhjZYyUT"
  },
  {
    "id": "drive-15GJ8IQMPKURkN1IuohTihiV55LV8uJel",
    "name": "Cadeira Extensora (Pés Rotacionados)",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Cadeira Extensora (Pés Rotacionados). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15GJ8IQMPKURkN1IuohTihiV55LV8uJel",
    "thumbnail": "https://lh3.googleusercontent.com/d/15GJ8IQMPKURkN1IuohTihiV55LV8uJel",
    "previewUrl": "https://lh3.googleusercontent.com/d/15GJ8IQMPKURkN1IuohTihiV55LV8uJel"
  },
  {
    "id": "drive-1tP3IdPaR5sxoS-BMDOT5t0zvtCt-il85",
    "name": "Leg Press 45°",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Leg Press 45°. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1tP3IdPaR5sxoS-BMDOT5t0zvtCt-il85",
    "thumbnail": "https://lh3.googleusercontent.com/d/1tP3IdPaR5sxoS-BMDOT5t0zvtCt-il85",
    "previewUrl": "https://lh3.googleusercontent.com/d/1tP3IdPaR5sxoS-BMDOT5t0zvtCt-il85"
  },
  {
    "id": "drive-1QWD_-cgyjb3oZFSZD4HtqsCaCSYPzez3",
    "name": "Levantamento Terra Romeno (RDL)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento Terra Romeno (RDL). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QWD_-cgyjb3oZFSZD4HtqsCaCSYPzez3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QWD_-cgyjb3oZFSZD4HtqsCaCSYPzez3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QWD_-cgyjb3oZFSZD4HtqsCaCSYPzez3"
  },
  {
    "id": "drive-1MFJvklHQ5Nu7-JCOeLMjBHMcAHrxFpSa",
    "name": "Levantamento Terra Sumô",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento Terra Sumô. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MFJvklHQ5Nu7-JCOeLMjBHMcAHrxFpSa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MFJvklHQ5Nu7-JCOeLMjBHMcAHrxFpSa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MFJvklHQ5Nu7-JCOeLMjBHMcAHrxFpSa"
  },
  {
    "id": "drive-1rVI7dAZV-ERe6IKE5uJOFSJV5kdhdZGM",
    "name": "Levantamento Terra",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento Terra. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rVI7dAZV-ERe6IKE5uJOFSJV5kdhdZGM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rVI7dAZV-ERe6IKE5uJOFSJV5kdhdZGM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rVI7dAZV-ERe6IKE5uJOFSJV5kdhdZGM"
  },
  {
    "id": "drive-1QwRhddhzi7sqrJLcs_auSKJFkwPwYhTc",
    "name": "Afundo / Avanço com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Afundo / Avanço com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QwRhddhzi7sqrJLcs_auSKJFkwPwYhTc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QwRhddhzi7sqrJLcs_auSKJFkwPwYhTc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QwRhddhzi7sqrJLcs_auSKJFkwPwYhTc"
  },
  {
    "id": "drive-1oiD90Y7tNn0aQf3oMMcbk0F1As7HEVlv",
    "name": "Afundo Reverso",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Afundo Reverso. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1oiD90Y7tNn0aQf3oMMcbk0F1As7HEVlv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1oiD90Y7tNn0aQf3oMMcbk0F1As7HEVlv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1oiD90Y7tNn0aQf3oMMcbk0F1As7HEVlv"
  },
  {
    "id": "drive-1VTG0xXP0GTin_5bh5RUbiQQ6P6JJi24x",
    "name": "Afundo Unilateral",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Afundo Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VTG0xXP0GTin_5bh5RUbiQQ6P6JJi24x",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VTG0xXP0GTin_5bh5RUbiQQ6P6JJi24x",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VTG0xXP0GTin_5bh5RUbiQQ6P6JJi24x"
  },
  {
    "id": "drive-1XOHf1iNhQMnHInX_-R5b-o3IT-bj2kyn",
    "name": "Mesa Flexora Deitado (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Mesa Flexora Deitado (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XOHf1iNhQMnHInX_-R5b-o3IT-bj2kyn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XOHf1iNhQMnHInX_-R5b-o3IT-bj2kyn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XOHf1iNhQMnHInX_-R5b-o3IT-bj2kyn"
  },
  {
    "id": "drive-1clTBnlyuTi2f1c-mhvp4Y61hm0OFO9pr",
    "name": "Leg Press 45° Pés Fechados",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Leg Press 45° Pés Fechados. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1clTBnlyuTi2f1c-mhvp4Y61hm0OFO9pr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1clTBnlyuTi2f1c-mhvp4Y61hm0OFO9pr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1clTBnlyuTi2f1c-mhvp4Y61hm0OFO9pr"
  },
  {
    "id": "drive-1uH7srVwUpfGIUtyFZ2Y9ZoQTF3LQQQdn",
    "name": "Passada Caminhando (Avanço)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Passada Caminhando (Avanço). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1uH7srVwUpfGIUtyFZ2Y9ZoQTF3LQQQdn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1uH7srVwUpfGIUtyFZ2Y9ZoQTF3LQQQdn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1uH7srVwUpfGIUtyFZ2Y9ZoQTF3LQQQdn"
  },
  {
    "id": "drive-1wygpiAZ4OummvpJY3e_X20uOkaY-FmRt",
    "name": "Agachamento na Polia Baixa",
    "muscleGroup": "Pernas",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Agachamento na Polia Baixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wygpiAZ4OummvpJY3e_X20uOkaY-FmRt",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wygpiAZ4OummvpJY3e_X20uOkaY-FmRt",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wygpiAZ4OummvpJY3e_X20uOkaY-FmRt"
  },
  {
    "id": "drive-1CBTCMfr2wfhNq9uwX3RaDF2dnWYzK9Ee",
    "name": "Flexão Posterior Fixa",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Flexão Posterior Fixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CBTCMfr2wfhNq9uwX3RaDF2dnWYzK9Ee",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CBTCMfr2wfhNq9uwX3RaDF2dnWYzK9Ee",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CBTCMfr2wfhNq9uwX3RaDF2dnWYzK9Ee"
  },
  {
    "id": "drive-13naEtQZKZdUkoIDEZu1rc2OWqae_hhOQ",
    "name": "Leg Press Unilateral (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Leg Press Unilateral (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13naEtQZKZdUkoIDEZu1rc2OWqae_hhOQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/13naEtQZKZdUkoIDEZu1rc2OWqae_hhOQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/13naEtQZKZdUkoIDEZu1rc2OWqae_hhOQ"
  },
  {
    "id": "drive-1muu7duvETW_aUwVDQXwtigkqh92TocVK",
    "name": "Educativo de Dobradiça de Quadril com Bastão",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Educativo de Dobradiça de Quadril com Bastão. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1muu7duvETW_aUwVDQXwtigkqh92TocVK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1muu7duvETW_aUwVDQXwtigkqh92TocVK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1muu7duvETW_aUwVDQXwtigkqh92TocVK"
  },
  {
    "id": "drive-1QheQ6HbmiEa8SklFdSQj08CGxXhtGHpc",
    "name": "Treino Foco Quadríceps Femoral",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Treino Foco Quadríceps Femoral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QheQ6HbmiEa8SklFdSQj08CGxXhtGHpc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QheQ6HbmiEa8SklFdSQj08CGxXhtGHpc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QheQ6HbmiEa8SklFdSQj08CGxXhtGHpc"
  },
  {
    "id": "drive-1PHggCNQy2PZl-nmbXx0LCQ4BpRYb0JLC",
    "name": "Agachamento Hack Machine",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Agachamento Hack Machine. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PHggCNQy2PZl-nmbXx0LCQ4BpRYb0JLC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PHggCNQy2PZl-nmbXx0LCQ4BpRYb0JLC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PHggCNQy2PZl-nmbXx0LCQ4BpRYb0JLC"
  },
  {
    "id": "drive-1h-96BkJ9q5tW6JsRYjbL_7egq_A17JNH",
    "name": "Hiperextensão Reversa (Posterior e Glúteos)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Hiperextensão Reversa (Posterior e Glúteos). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1h-96BkJ9q5tW6JsRYjbL_7egq_A17JNH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1h-96BkJ9q5tW6JsRYjbL_7egq_A17JNH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1h-96BkJ9q5tW6JsRYjbL_7egq_A17JNH"
  },
  {
    "id": "drive-1ClrStBYRqw_TRapOjKdnQ6XoeA_iV1iC",
    "name": "Agachamento Hack Reverso",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Agachamento Hack Reverso. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ClrStBYRqw_TRapOjKdnQ6XoeA_iV1iC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ClrStBYRqw_TRapOjKdnQ6XoeA_iV1iC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ClrStBYRqw_TRapOjKdnQ6XoeA_iV1iC"
  },
  {
    "id": "drive-1Ytl7Wc1KwSDtu_UwbWESpWitVpLdPd7B",
    "name": "Cadeira Flexora Sentada (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Cadeira Flexora Sentada (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Ytl7Wc1KwSDtu_UwbWESpWitVpLdPd7B",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Ytl7Wc1KwSDtu_UwbWESpWitVpLdPd7B",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Ytl7Wc1KwSDtu_UwbWESpWitVpLdPd7B"
  },
  {
    "id": "drive-1nxw76k9d-qZaSHl2yXO-SNn3ae71bW3t",
    "name": "Cadeira Extensora Unilateral",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Cadeira Extensora Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1nxw76k9d-qZaSHl2yXO-SNn3ae71bW3t",
    "thumbnail": "https://lh3.googleusercontent.com/d/1nxw76k9d-qZaSHl2yXO-SNn3ae71bW3t",
    "previewUrl": "https://lh3.googleusercontent.com/d/1nxw76k9d-qZaSHl2yXO-SNn3ae71bW3t"
  },
  {
    "id": "drive-1D3P0YbnAiX6GtlEp9yqxiKZpSaMeZfQY",
    "name": "Agachamento Guiado no Smith",
    "muscleGroup": "Pernas",
    "equipment": "Máquina Smith",
    "instructions": "Execução de Agachamento Guiado no Smith. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1D3P0YbnAiX6GtlEp9yqxiKZpSaMeZfQY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1D3P0YbnAiX6GtlEp9yqxiKZpSaMeZfQY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1D3P0YbnAiX6GtlEp9yqxiKZpSaMeZfQY"
  },
  {
    "id": "drive-1DepGz7_v5_hpLX1RWbAOrX7HGdg_8XNn",
    "name": "Subida Lateral no Step",
    "muscleGroup": "Pernas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Subida Lateral no Step. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DepGz7_v5_hpLX1RWbAOrX7HGdg_8XNn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DepGz7_v5_hpLX1RWbAOrX7HGdg_8XNn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DepGz7_v5_hpLX1RWbAOrX7HGdg_8XNn"
  },
  {
    "id": "drive-11vbBkwJ7rG3Q5H2prC5PqIDXcSqtIuzr",
    "name": "Step Up com Elevação de Joelho",
    "muscleGroup": "Pernas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Step Up com Elevação de Joelho. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11vbBkwJ7rG3Q5H2prC5PqIDXcSqtIuzr",
    "thumbnail": "https://lh3.googleusercontent.com/d/11vbBkwJ7rG3Q5H2prC5PqIDXcSqtIuzr",
    "previewUrl": "https://lh3.googleusercontent.com/d/11vbBkwJ7rG3Q5H2prC5PqIDXcSqtIuzr"
  },
  {
    "id": "drive-1Bd_WCw0-YW2i6kWBc_LNLdu9lfZJ2WDv",
    "name": "Subida no Caixote (Step Up)",
    "muscleGroup": "Pernas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Subida no Caixote (Step Up). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Bd_WCw0-YW2i6kWBc_LNLdu9lfZJ2WDv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Bd_WCw0-YW2i6kWBc_LNLdu9lfZJ2WDv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Bd_WCw0-YW2i6kWBc_LNLdu9lfZJ2WDv"
  },
  {
    "id": "drive-1ZReiP_hGihKaX9iB6j4mdKX30LlXKGVA",
    "name": "Stiff com Barra por Trás",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Stiff com Barra por Trás. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZReiP_hGihKaX9iB6j4mdKX30LlXKGVA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZReiP_hGihKaX9iB6j4mdKX30LlXKGVA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZReiP_hGihKaX9iB6j4mdKX30LlXKGVA"
  },
  {
    "id": "drive-1wNtNgnVOr9DbW-3IzV-S0Qx26pYemJg_",
    "name": "Stiff com Barra (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Stiff com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wNtNgnVOr9DbW-3IzV-S0Qx26pYemJg_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wNtNgnVOr9DbW-3IzV-S0Qx26pYemJg_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wNtNgnVOr9DbW-3IzV-S0Qx26pYemJg_"
  },
  {
    "id": "drive-1D-RJ0XyrMZ2xgGQHbdobbXljys-BQQ5z",
    "name": "Stiff com Pernas Estendidas",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Stiff com Pernas Estendidas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1D-RJ0XyrMZ2xgGQHbdobbXljys-BQQ5z",
    "thumbnail": "https://lh3.googleusercontent.com/d/1D-RJ0XyrMZ2xgGQHbdobbXljys-BQQ5z",
    "previewUrl": "https://lh3.googleusercontent.com/d/1D-RJ0XyrMZ2xgGQHbdobbXljys-BQQ5z"
  },
  {
    "id": "drive-1qoGTVAjQL1sZ6QBFNMLUv9Ixjrp04Dc8",
    "name": "Agachamento Sumô com Haltere (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Agachamento Sumô com Haltere (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qoGTVAjQL1sZ6QBFNMLUv9Ixjrp04Dc8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qoGTVAjQL1sZ6QBFNMLUv9Ixjrp04Dc8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qoGTVAjQL1sZ6QBFNMLUv9Ixjrp04Dc8"
  },
  {
    "id": "drive-1r22RFSsemte-xXo5URIJmjfLSkSNp-X_",
    "name": "Agachamento Sumô com Haltere (Variação 3)",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Agachamento Sumô com Haltere (Variação 3). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1r22RFSsemte-xXo5URIJmjfLSkSNp-X_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1r22RFSsemte-xXo5URIJmjfLSkSNp-X_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1r22RFSsemte-xXo5URIJmjfLSkSNp-X_"
  },
  {
    "id": "drive-1_Bt0fWMP6Zh42Bl_UwIW70Hzc4EFWG9M",
    "name": "Agachamento Sumô",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Agachamento Sumô. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_Bt0fWMP6Zh42Bl_UwIW70Hzc4EFWG9M",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_Bt0fWMP6Zh42Bl_UwIW70Hzc4EFWG9M",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_Bt0fWMP6Zh42Bl_UwIW70Hzc4EFWG9M"
  },
  {
    "id": "drive-1syenE3DSVnjD_4bPkNiFV9oq_vWre-tJ",
    "name": "Levantamento Terra na Barra Hexagonal (Trap Bar)",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Levantamento Terra na Barra Hexagonal (Trap Bar). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1syenE3DSVnjD_4bPkNiFV9oq_vWre-tJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1syenE3DSVnjD_4bPkNiFV9oq_vWre-tJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1syenE3DSVnjD_4bPkNiFV9oq_vWre-tJ"
  },
  {
    "id": "drive-1Im0uEvzZcWafxJzKNXb2stGKhe4DaHW6",
    "name": "Levantamento Terra Tradicional",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento Terra Tradicional. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Im0uEvzZcWafxJzKNXb2stGKhe4DaHW6",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Im0uEvzZcWafxJzKNXb2stGKhe4DaHW6",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Im0uEvzZcWafxJzKNXb2stGKhe4DaHW6"
  },
  {
    "id": "drive-1lQA-6YssLIOvxmOSYVueXaLJS3kupCbV",
    "name": "Subida no Banco com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Subida no Banco com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lQA-6YssLIOvxmOSYVueXaLJS3kupCbV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lQA-6YssLIOvxmOSYVueXaLJS3kupCbV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lQA-6YssLIOvxmOSYVueXaLJS3kupCbV"
  },
  {
    "id": "drive-1CfEeLEvFHECrRVnOnHG2TY1BS6V3JD6u",
    "name": "Subida no Caixote",
    "muscleGroup": "Pernas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Subida no Caixote. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CfEeLEvFHECrRVnOnHG2TY1BS6V3JD6u",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CfEeLEvFHECrRVnOnHG2TY1BS6V3JD6u",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CfEeLEvFHECrRVnOnHG2TY1BS6V3JD6u"
  },
  {
    "id": "drive-1yJR2nj8GoPSWs_0NX2XOuT31hRAnooDz",
    "name": "Subida Unilateral no Caixote",
    "muscleGroup": "Pernas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Subida Unilateral no Caixote. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yJR2nj8GoPSWs_0NX2XOuT31hRAnooDz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yJR2nj8GoPSWs_0NX2XOuT31hRAnooDz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yJR2nj8GoPSWs_0NX2XOuT31hRAnooDz"
  },
  {
    "id": "drive-1wVN45rtBjoncL2HycvTiXJCTYA16rkkr",
    "name": "Desenvolvimento Arnold",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Desenvolvimento Arnold. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wVN45rtBjoncL2HycvTiXJCTYA16rkkr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wVN45rtBjoncL2HycvTiXJCTYA16rkkr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wVN45rtBjoncL2HycvTiXJCTYA16rkkr"
  },
  {
    "id": "drive-1YDkqMxswRMJN6w5GFmyuAMblN66QBvla",
    "name": "Desenvolvimento Arnoldes",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Desenvolvimento Arnoldes. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YDkqMxswRMJN6w5GFmyuAMblN66QBvla",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YDkqMxswRMJN6w5GFmyuAMblN66QBvla",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YDkqMxswRMJN6w5GFmyuAMblN66QBvla"
  },
  {
    "id": "drive-1aZkN6AG0u5ArXUvnKZKnI6DaS-ydtrRa",
    "name": "Push Jerk com Barra",
    "muscleGroup": "Ombros",
    "equipment": "Barra",
    "instructions": "Execução de Barra Push Jerk Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aZkN6AG0u5ArXUvnKZKnI6DaS-ydtrRa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aZkN6AG0u5ArXUvnKZKnI6DaS-ydtrRa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aZkN6AG0u5ArXUvnKZKnI6DaS-ydtrRa"
  },
  {
    "id": "drive-1PGSVTJjetgva9Ys8IpQjvzj_z6LzZqfB",
    "name": "Elevação Lateral com Polia",
    "muscleGroup": "Ombros",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Elevação Lateral com Polia. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PGSVTJjetgva9Ys8IpQjvzj_z6LzZqfB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PGSVTJjetgva9Ys8IpQjvzj_z6LzZqfB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PGSVTJjetgva9Ys8IpQjvzj_z6LzZqfB"
  },
  {
    "id": "drive-13aciAaE4DyzrB4SjUzBbYRwiztyTXEok",
    "name": "Desenvolvimento de Ombros na Polia",
    "muscleGroup": "Ombros",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Shoulder Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13aciAaE4DyzrB4SjUzBbYRwiztyTXEok",
    "thumbnail": "https://lh3.googleusercontent.com/d/13aciAaE4DyzrB4SjUzBbYRwiztyTXEok",
    "previewUrl": "https://lh3.googleusercontent.com/d/13aciAaE4DyzrB4SjUzBbYRwiztyTXEok"
  },
  {
    "id": "drive-1Xv5tUvoCl8JyEolbesmNDHUJZOJsy-S6",
    "name": "Circular de Ombro",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Circular de Ombro. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Xv5tUvoCl8JyEolbesmNDHUJZOJsy-S6",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Xv5tUvoCl8JyEolbesmNDHUJZOJsy-S6",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Xv5tUvoCl8JyEolbesmNDHUJZOJsy-S6"
  },
  {
    "id": "drive-1U5_yQKBLNLMuNxWgwGYkkTgfkU4TE_9z",
    "name": "Crucifixo Inverso",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Crucifixo Inverso. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1U5_yQKBLNLMuNxWgwGYkkTgfkU4TE_9z",
    "thumbnail": "https://lh3.googleusercontent.com/d/1U5_yQKBLNLMuNxWgwGYkkTgfkU4TE_9z",
    "previewUrl": "https://lh3.googleusercontent.com/d/1U5_yQKBLNLMuNxWgwGYkkTgfkU4TE_9z"
  },
  {
    "id": "drive-1xLQeSVSHIXUeYseRZigSptdgoSS_IH9u",
    "name": "Desenvolvimento Cubano (Manguito e Ombros)",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Cuban Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xLQeSVSHIXUeYseRZigSptdgoSS_IH9u",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xLQeSVSHIXUeYseRZigSptdgoSS_IH9u",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xLQeSVSHIXUeYseRZigSptdgoSS_IH9u"
  },
  {
    "id": "drive-118O6Va7wEu2M-Lmuq6N7o4jObGXI00fc",
    "name": "Crucifixo Inverso (Deltóide Posterior)",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Delta Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/118O6Va7wEu2M-Lmuq6N7o4jObGXI00fc",
    "thumbnail": "https://lh3.googleusercontent.com/d/118O6Va7wEu2M-Lmuq6N7o4jObGXI00fc",
    "previewUrl": "https://lh3.googleusercontent.com/d/118O6Va7wEu2M-Lmuq6N7o4jObGXI00fc"
  },
  {
    "id": "drive-1mSpSgPjFMEPCWi0TJk6jftcyidbC0lWO",
    "name": "Desenvolvimento com Halteres",
    "muscleGroup": "Ombros",
    "equipment": "Halteres",
    "instructions": "Execução de Desenvolvimento com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mSpSgPjFMEPCWi0TJk6jftcyidbC0lWO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mSpSgPjFMEPCWi0TJk6jftcyidbC0lWO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mSpSgPjFMEPCWi0TJk6jftcyidbC0lWO"
  },
  {
    "id": "drive-1_QRfiDgKTVR7j5dH1Cysc8MKCTlkINX5",
    "name": "Desenvolvimento em Pé",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Desenvolvimento em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_QRfiDgKTVR7j5dH1Cysc8MKCTlkINX5",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_QRfiDgKTVR7j5dH1Cysc8MKCTlkINX5",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_QRfiDgKTVR7j5dH1Cysc8MKCTlkINX5"
  },
  {
    "id": "drive-1pXneJw_rjp_syA8iHxdcLEiLlgOOQNGR",
    "name": "Desenvolvimento Máquina",
    "muscleGroup": "Ombros",
    "equipment": "Máquina",
    "instructions": "Execução de Desenvolvimento Máquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pXneJw_rjp_syA8iHxdcLEiLlgOOQNGR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pXneJw_rjp_syA8iHxdcLEiLlgOOQNGR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pXneJw_rjp_syA8iHxdcLEiLlgOOQNGR"
  },
  {
    "id": "drive-1T3J0GVnT4SSNHYYPaFyiwFfaMnCCufXQ",
    "name": "Desenvolvimento Por Trás Barra",
    "muscleGroup": "Ombros",
    "equipment": "Barra",
    "instructions": "Execução de Desenvolvimento Por Trás Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1T3J0GVnT4SSNHYYPaFyiwFfaMnCCufXQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1T3J0GVnT4SSNHYYPaFyiwFfaMnCCufXQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1T3J0GVnT4SSNHYYPaFyiwFfaMnCCufXQ"
  },
  {
    "id": "drive-1Nx31QTm6Sl7szBRlc6old4xMxAWBJjN_",
    "name": "Desenvolvimento de Ombros no Smith",
    "muscleGroup": "Ombros",
    "equipment": "Máquina",
    "instructions": "Execução de Desenvolvimento Smith Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Nx31QTm6Sl7szBRlc6old4xMxAWBJjN_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Nx31QTm6Sl7szBRlc6old4xMxAWBJjN_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Nx31QTm6Sl7szBRlc6old4xMxAWBJjN_"
  },
  {
    "id": "drive-1l0vbjVQOiO6VCzfFw4D3jvvEbKrVvhER",
    "name": "Desenvolvimento Unilateral",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Desenvolvimento Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1l0vbjVQOiO6VCzfFw4D3jvvEbKrVvhER",
    "thumbnail": "https://lh3.googleusercontent.com/d/1l0vbjVQOiO6VCzfFw4D3jvvEbKrVvhER",
    "previewUrl": "https://lh3.googleusercontent.com/d/1l0vbjVQOiO6VCzfFw4D3jvvEbKrVvhER"
  },
  {
    "id": "drive-1WKQxrB4t4fYob_q6h_J8uawAWlTJUafe",
    "name": "Desenvolvimento Militar com Halteres",
    "muscleGroup": "Ombros",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Military Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WKQxrB4t4fYob_q6h_J8uawAWlTJUafe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WKQxrB4t4fYob_q6h_J8uawAWlTJUafe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WKQxrB4t4fYob_q6h_J8uawAWlTJUafe"
  },
  {
    "id": "drive-1LipXvmSsVxw1iNXvYA0bB6UPWshaenha",
    "name": "Elevaçao Lateral com Apoio",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevaçao Lateral com Apoio. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LipXvmSsVxw1iNXvYA0bB6UPWshaenha",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LipXvmSsVxw1iNXvYA0bB6UPWshaenha",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LipXvmSsVxw1iNXvYA0bB6UPWshaenha"
  },
  {
    "id": "drive-1tvJ3XmTAvo1B25mBBdWmt8E_z7pyCEOY",
    "name": "Elevação 6",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação 6. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1tvJ3XmTAvo1B25mBBdWmt8E_z7pyCEOY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1tvJ3XmTAvo1B25mBBdWmt8E_z7pyCEOY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1tvJ3XmTAvo1B25mBBdWmt8E_z7pyCEOY"
  },
  {
    "id": "drive-1qZvC04ePTbG_3WpD4V6XSrBAgxhOGBQI",
    "name": "Elevação Frontal Barra",
    "muscleGroup": "Ombros",
    "equipment": "Barra",
    "instructions": "Execução de Elevação Frontal Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qZvC04ePTbG_3WpD4V6XSrBAgxhOGBQI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qZvC04ePTbG_3WpD4V6XSrBAgxhOGBQI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qZvC04ePTbG_3WpD4V6XSrBAgxhOGBQI"
  },
  {
    "id": "drive-1ogh52tMkXx5GY4SkE-0qRDLnAdXGBl7w",
    "name": "Elevação Frontal Polia Baixa",
    "muscleGroup": "Ombros",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Elevação Frontal Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ogh52tMkXx5GY4SkE-0qRDLnAdXGBl7w",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ogh52tMkXx5GY4SkE-0qRDLnAdXGBl7w",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ogh52tMkXx5GY4SkE-0qRDLnAdXGBl7w"
  },
  {
    "id": "drive-1_W9oZtJl4KSV04L8GAaN4Mlqewmjt5-X",
    "name": "Elevação Frontal Sentado",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Frontal Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_W9oZtJl4KSV04L8GAaN4Mlqewmjt5-X",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_W9oZtJl4KSV04L8GAaN4Mlqewmjt5-X",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_W9oZtJl4KSV04L8GAaN4Mlqewmjt5-X"
  },
  {
    "id": "drive-1Z492C1zwmSRmh47nkykdWEdBC_9gMMTa",
    "name": "Elevação Frontal Unilateral Polia Baixa",
    "muscleGroup": "Ombros",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Elevação Frontal Unilateral Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Z492C1zwmSRmh47nkykdWEdBC_9gMMTa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Z492C1zwmSRmh47nkykdWEdBC_9gMMTa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Z492C1zwmSRmh47nkykdWEdBC_9gMMTa"
  },
  {
    "id": "drive-1uB9wGsnAhO5O3W9uWmAZalPBLK-rx7r9",
    "name": "Elevação Frontal",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Frontal. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1uB9wGsnAhO5O3W9uWmAZalPBLK-rx7r9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1uB9wGsnAhO5O3W9uWmAZalPBLK-rx7r9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1uB9wGsnAhO5O3W9uWmAZalPBLK-rx7r9"
  },
  {
    "id": "drive-1WMqtczf8ai9NatJ1aN0s-VjUCaxIblsJ",
    "name": "Elevação Lateral Alavanca",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Lateral Alavanca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WMqtczf8ai9NatJ1aN0s-VjUCaxIblsJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WMqtczf8ai9NatJ1aN0s-VjUCaxIblsJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WMqtczf8ai9NatJ1aN0s-VjUCaxIblsJ"
  },
  {
    "id": "drive-11VTgc_xbM0r33uermzDKG4-DOMVwIBBZ",
    "name": "Elevação Lateral Cruzada",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Lateral Cruzada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11VTgc_xbM0r33uermzDKG4-DOMVwIBBZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/11VTgc_xbM0r33uermzDKG4-DOMVwIBBZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/11VTgc_xbM0r33uermzDKG4-DOMVwIBBZ"
  },
  {
    "id": "drive-1j7iUhT7dROS-FIZLpeqs_9eAMrpGsg-Y",
    "name": "Elevação Lateral Flexionada",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Lateral Flexionada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1j7iUhT7dROS-FIZLpeqs_9eAMrpGsg-Y",
    "thumbnail": "https://lh3.googleusercontent.com/d/1j7iUhT7dROS-FIZLpeqs_9eAMrpGsg-Y",
    "previewUrl": "https://lh3.googleusercontent.com/d/1j7iUhT7dROS-FIZLpeqs_9eAMrpGsg-Y"
  },
  {
    "id": "drive-1RUP-Vjl1SAjJa-ME1eWcj7DjUXEker1J",
    "name": "Elevação Lateral Inclinada",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Lateral Inclinada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RUP-Vjl1SAjJa-ME1eWcj7DjUXEker1J",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RUP-Vjl1SAjJa-ME1eWcj7DjUXEker1J",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RUP-Vjl1SAjJa-ME1eWcj7DjUXEker1J"
  },
  {
    "id": "drive-1CAfzQ_RwNsobhqOG4FxjsIgs9RBlx8Ou",
    "name": "Elevação Lateral Inclinado",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Lateral Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CAfzQ_RwNsobhqOG4FxjsIgs9RBlx8Ou",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CAfzQ_RwNsobhqOG4FxjsIgs9RBlx8Ou",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CAfzQ_RwNsobhqOG4FxjsIgs9RBlx8Ou"
  },
  {
    "id": "drive-1SVNL1mcVaFIacgzwBXTC2kLJORpEw240",
    "name": "Elevação Lateral",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Lateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1SVNL1mcVaFIacgzwBXTC2kLJORpEw240",
    "thumbnail": "https://lh3.googleusercontent.com/d/1SVNL1mcVaFIacgzwBXTC2kLJORpEw240",
    "previewUrl": "https://lh3.googleusercontent.com/d/1SVNL1mcVaFIacgzwBXTC2kLJORpEw240"
  },
  {
    "id": "drive-1Ofk1bmrEJGkanzfc0MeTtUWQV-cBWG2c",
    "name": "Elevação Unilateral Polia Baixa",
    "muscleGroup": "Ombros",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Elevação Unilateral Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Ofk1bmrEJGkanzfc0MeTtUWQV-cBWG2c",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Ofk1bmrEJGkanzfc0MeTtUWQV-cBWG2c",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Ofk1bmrEJGkanzfc0MeTtUWQV-cBWG2c"
  },
  {
    "id": "drive-1AUXnhhvARVB5qMmOXPodg2e-mk2J5BrH",
    "name": "Crucifixo Inverso (Variação 2)",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Crucifixo Inverso (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AUXnhhvARVB5qMmOXPodg2e-mk2J5BrH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AUXnhhvARVB5qMmOXPodg2e-mk2J5BrH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AUXnhhvARVB5qMmOXPodg2e-mk2J5BrH"
  },
  {
    "id": "drive-1_gNyzgVK6ZrCKEEK-NLDsm6o5tA-_mPJ",
    "name": "Elevação Frontal Alternada / 2 Vias",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Front 2 Vias. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_gNyzgVK6ZrCKEEK-NLDsm6o5tA-_mPJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_gNyzgVK6ZrCKEEK-NLDsm6o5tA-_mPJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_gNyzgVK6ZrCKEEK-NLDsm6o5tA-_mPJ"
  },
  {
    "id": "drive-1ay847lS0DA6_7tDOdER0IdwzVV3LDhLu",
    "name": "Frontal Dumblle",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Frontal Dumblle. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ay847lS0DA6_7tDOdER0IdwzVV3LDhLu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ay847lS0DA6_7tDOdER0IdwzVV3LDhLu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ay847lS0DA6_7tDOdER0IdwzVV3LDhLu"
  },
  {
    "id": "drive-107dHBdcdVv6JPmBdhJ60hx18efhEhGqa",
    "name": "Frontal Unilateral",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Frontal Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/107dHBdcdVv6JPmBdhJ60hx18efhEhGqa",
    "thumbnail": "https://lh3.googleusercontent.com/d/107dHBdcdVv6JPmBdhJ60hx18efhEhGqa",
    "previewUrl": "https://lh3.googleusercontent.com/d/107dHBdcdVv6JPmBdhJ60hx18efhEhGqa"
  },
  {
    "id": "drive-1xLVY9L2vn1djzKrOqP9nRujwnU846cBE",
    "name": "Inclinado Polia Baixa",
    "muscleGroup": "Ombros",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Inclinado Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xLVY9L2vn1djzKrOqP9nRujwnU846cBE",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xLVY9L2vn1djzKrOqP9nRujwnU846cBE",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xLVY9L2vn1djzKrOqP9nRujwnU846cBE"
  },
  {
    "id": "drive-1xnuZxORgelt0cEGZYr3ypnhPf8EEQ0wh",
    "name": "Inverso Curvado",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Inverso Curvado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xnuZxORgelt0cEGZYr3ypnhPf8EEQ0wh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xnuZxORgelt0cEGZYr3ypnhPf8EEQ0wh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xnuZxORgelt0cEGZYr3ypnhPf8EEQ0wh"
  },
  {
    "id": "drive-1e6SpWv_fInL0u8GAchCQe55PZ7-ObFhM",
    "name": "Inverso",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Inverso. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1e6SpWv_fInL0u8GAchCQe55PZ7-ObFhM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1e6SpWv_fInL0u8GAchCQe55PZ7-ObFhM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1e6SpWv_fInL0u8GAchCQe55PZ7-ObFhM"
  },
  {
    "id": "drive-13kyTqk2GXC3tCUCpC1dDwd35lqFTcC_x",
    "name": "Desenvolvimento Unilateral no Landmine",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Landmine Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13kyTqk2GXC3tCUCpC1dDwd35lqFTcC_x",
    "thumbnail": "https://lh3.googleusercontent.com/d/13kyTqk2GXC3tCUCpC1dDwd35lqFTcC_x",
    "previewUrl": "https://lh3.googleusercontent.com/d/13kyTqk2GXC3tCUCpC1dDwd35lqFTcC_x"
  },
  {
    "id": "drive-1Z9FGbH21HNcTlp9-Aq6B_6inKa8pCNfA",
    "name": "Lateral Frontal Halteres",
    "muscleGroup": "Ombros",
    "equipment": "Halteres",
    "instructions": "Execução de Lateral Frontal Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Z9FGbH21HNcTlp9-Aq6B_6inKa8pCNfA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Z9FGbH21HNcTlp9-Aq6B_6inKa8pCNfA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Z9FGbH21HNcTlp9-Aq6B_6inKa8pCNfA"
  },
  {
    "id": "drive-1HQuMltu1JZPua4UYJTXGZCYiCDa3uHZe",
    "name": "Lateral Sentado",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Lateral Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HQuMltu1JZPua4UYJTXGZCYiCDa3uHZe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HQuMltu1JZPua4UYJTXGZCYiCDa3uHZe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HQuMltu1JZPua4UYJTXGZCYiCDa3uHZe"
  },
  {
    "id": "drive-17WTHKwASJRDEZfkZMT7UPAsLTJPPa90y",
    "name": "Elevação Lateral na Máquina",
    "muscleGroup": "Ombros",
    "equipment": "Máquina",
    "instructions": "Execução de Lateral Raise Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17WTHKwASJRDEZfkZMT7UPAsLTJPPa90y",
    "thumbnail": "https://lh3.googleusercontent.com/d/17WTHKwASJRDEZfkZMT7UPAsLTJPPa90y",
    "previewUrl": "https://lh3.googleusercontent.com/d/17WTHKwASJRDEZfkZMT7UPAsLTJPPa90y"
  },
  {
    "id": "drive-1-sfZZV2uxZ1lDoCJ6yTtZpQjLswXc5QF",
    "name": "Manguito",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Manguito. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-sfZZV2uxZ1lDoCJ6yTtZpQjLswXc5QF",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-sfZZV2uxZ1lDoCJ6yTtZpQjLswXc5QF",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-sfZZV2uxZ1lDoCJ6yTtZpQjLswXc5QF"
  },
  {
    "id": "drive-1K0V18k9Y4MG8YhKIjDGh7VxOFRTvw-UB",
    "name": "Meio Desenvolvimento Arnold",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Meio Desenvolvimento Arnold. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1K0V18k9Y4MG8YhKIjDGh7VxOFRTvw-UB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1K0V18k9Y4MG8YhKIjDGh7VxOFRTvw-UB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1K0V18k9Y4MG8YhKIjDGh7VxOFRTvw-UB"
  },
  {
    "id": "drive-18sdSKXGW1XKOuk7tHuIfQ1qEzT2HA_es",
    "name": "Desenvolvimento Militar com Barra",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Military Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18sdSKXGW1XKOuk7tHuIfQ1qEzT2HA_es",
    "thumbnail": "https://lh3.googleusercontent.com/d/18sdSKXGW1XKOuk7tHuIfQ1qEzT2HA_es",
    "previewUrl": "https://lh3.googleusercontent.com/d/18sdSKXGW1XKOuk7tHuIfQ1qEzT2HA_es"
  },
  {
    "id": "drive-1zUvLrMFIhq-XqQcmeyFJKFEAIXd80fUq",
    "name": "Push Press com Barra",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Push Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zUvLrMFIhq-XqQcmeyFJKFEAIXd80fUq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zUvLrMFIhq-XqQcmeyFJKFEAIXd80fUq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zUvLrMFIhq-XqQcmeyFJKFEAIXd80fUq"
  },
  {
    "id": "drive-1DOEIkpHwa_uLQlYOsN-3luX18VREcIgP",
    "name": "Remada Inversa Flexionada",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Remada Inversa Flexionada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DOEIkpHwa_uLQlYOsN-3luX18VREcIgP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DOEIkpHwa_uLQlYOsN-3luX18VREcIgP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DOEIkpHwa_uLQlYOsN-3luX18VREcIgP"
  },
  {
    "id": "drive-1L3UEZdrxkAv68tA43rT5fJVynymutF9U",
    "name": "Desenvolvimento Sentado com Barra",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Seated Overhead Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1L3UEZdrxkAv68tA43rT5fJVynymutF9U",
    "thumbnail": "https://lh3.googleusercontent.com/d/1L3UEZdrxkAv68tA43rT5fJVynymutF9U",
    "previewUrl": "https://lh3.googleusercontent.com/d/1L3UEZdrxkAv68tA43rT5fJVynymutF9U"
  },
  {
    "id": "drive-1p433ZiuhARcTuKr5XXkszLWGwSDCh_aL",
    "name": "Desenvolvimento no Rack (Pin Press)",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Shoulder Pin Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1p433ZiuhARcTuKr5XXkszLWGwSDCh_aL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1p433ZiuhARcTuKr5XXkszLWGwSDCh_aL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1p433ZiuhARcTuKr5XXkszLWGwSDCh_aL"
  },
  {
    "id": "drive-1FWHUxUop--MX42dpWzIIlvafInjd8mrn",
    "name": "Desenvolvimento Z-Press Sentado no Solo",
    "muscleGroup": "Ombros",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Z Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FWHUxUop--MX42dpWzIIlvafInjd8mrn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FWHUxUop--MX42dpWzIIlvafInjd8mrn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FWHUxUop--MX42dpWzIIlvafInjd8mrn"
  },
  {
    "id": "drive-18Gv0Z19Y8JvcVYNtA86eJOhDvLJ6wpK_",
    "name": "Panturrilha em Pé na Polia",
    "muscleGroup": "Panturrilha",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Standing Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18Gv0Z19Y8JvcVYNtA86eJOhDvLJ6wpK_",
    "thumbnail": "https://lh3.googleusercontent.com/d/18Gv0Z19Y8JvcVYNtA86eJOhDvLJ6wpK_",
    "previewUrl": "https://lh3.googleusercontent.com/d/18Gv0Z19Y8JvcVYNtA86eJOhDvLJ6wpK_"
  },
  {
    "id": "drive-1CJ2TL9z7Ru3vz9ad95n3HV0oy_evdASE",
    "name": "Panturrilha no Agachamento / Step",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Calf Agachamentos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CJ2TL9z7Ru3vz9ad95n3HV0oy_evdASE",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CJ2TL9z7Ru3vz9ad95n3HV0oy_evdASE",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CJ2TL9z7Ru3vz9ad95n3HV0oy_evdASE"
  },
  {
    "id": "drive-1pqdkY2zOHDl6rBdiKb__jWEmFagO_rRT",
    "name": "Panturrilha Burrinho (Donkey Calf Raise)",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Donkey Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pqdkY2zOHDl6rBdiKb__jWEmFagO_rRT",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pqdkY2zOHDl6rBdiKb__jWEmFagO_rRT",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pqdkY2zOHDl6rBdiKb__jWEmFagO_rRT"
  },
  {
    "id": "drive-1Vy6f1LGabV7Es06N5O4BZS-PSD9K7Lyv",
    "name": "Panturrilha em Pé com Halteres",
    "muscleGroup": "Panturrilha",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Vy6f1LGabV7Es06N5O4BZS-PSD9K7Lyv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Vy6f1LGabV7Es06N5O4BZS-PSD9K7Lyv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Vy6f1LGabV7Es06N5O4BZS-PSD9K7Lyv"
  },
  {
    "id": "drive-1pVmxmLcYpj3vjmq1CqzYI6PO-DuIY06I",
    "name": "Flexão Plantar com Apoio",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Plantar com Apoio. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pVmxmLcYpj3vjmq1CqzYI6PO-DuIY06I",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pVmxmLcYpj3vjmq1CqzYI6PO-DuIY06I",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pVmxmLcYpj3vjmq1CqzYI6PO-DuIY06I"
  },
  {
    "id": "drive-15RGpCm8QebcBL-IbxiUkOl0jiWpkqCyB",
    "name": "Flexão Plantar com Halteres",
    "muscleGroup": "Panturrilha",
    "equipment": "Halteres",
    "instructions": "Execução de Flexão Plantar com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15RGpCm8QebcBL-IbxiUkOl0jiWpkqCyB",
    "thumbnail": "https://lh3.googleusercontent.com/d/15RGpCm8QebcBL-IbxiUkOl0jiWpkqCyB",
    "previewUrl": "https://lh3.googleusercontent.com/d/15RGpCm8QebcBL-IbxiUkOl0jiWpkqCyB"
  },
  {
    "id": "drive-16rknqcksb33uSOL6ry2tuHcFZIb7kUV0",
    "name": "Flexão Plantar Escada",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Plantar Escada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/16rknqcksb33uSOL6ry2tuHcFZIb7kUV0",
    "thumbnail": "https://lh3.googleusercontent.com/d/16rknqcksb33uSOL6ry2tuHcFZIb7kUV0",
    "previewUrl": "https://lh3.googleusercontent.com/d/16rknqcksb33uSOL6ry2tuHcFZIb7kUV0"
  },
  {
    "id": "drive-1s8iPRLezHqIBoakYfRrcf54-121ABsaH",
    "name": "Flexão Plantar Leg Horizontal",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Plantar Leg Horizontal. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1s8iPRLezHqIBoakYfRrcf54-121ABsaH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1s8iPRLezHqIBoakYfRrcf54-121ABsaH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1s8iPRLezHqIBoakYfRrcf54-121ABsaH"
  },
  {
    "id": "drive-1qFj4JCnG1o2EgB4JJUGItR_02BYkM_Vu",
    "name": "Flexão Plantar no Leg 45",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Plantar no Leg 45. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qFj4JCnG1o2EgB4JJUGItR_02BYkM_Vu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qFj4JCnG1o2EgB4JJUGItR_02BYkM_Vu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qFj4JCnG1o2EgB4JJUGItR_02BYkM_Vu"
  },
  {
    "id": "drive-1fr8pfuBp4gOyeup6H-uLQVfWvZSxUGJC",
    "name": "Flexão Plantar no Step com Barra",
    "muscleGroup": "Panturrilha",
    "equipment": "Barra",
    "instructions": "Execução de Flexão Plantar no Step com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fr8pfuBp4gOyeup6H-uLQVfWvZSxUGJC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fr8pfuBp4gOyeup6H-uLQVfWvZSxUGJC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fr8pfuBp4gOyeup6H-uLQVfWvZSxUGJC"
  },
  {
    "id": "drive-1628hD8pz_MuWV5XPR1ywzWkjC32JJn-e",
    "name": "Flexão Plantar no Step",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Plantar no Step. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1628hD8pz_MuWV5XPR1ywzWkjC32JJn-e",
    "thumbnail": "https://lh3.googleusercontent.com/d/1628hD8pz_MuWV5XPR1ywzWkjC32JJn-e",
    "previewUrl": "https://lh3.googleusercontent.com/d/1628hD8pz_MuWV5XPR1ywzWkjC32JJn-e"
  },
  {
    "id": "drive-1o0PjILsZ1bPhiBRnAjbk3e3jtL5GomI_",
    "name": "Panturrilha no Leg Press",
    "muscleGroup": "Panturrilha",
    "equipment": "Máquina",
    "instructions": "Execução de Leg Press Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1o0PjILsZ1bPhiBRnAjbk3e3jtL5GomI_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1o0PjILsZ1bPhiBRnAjbk3e3jtL5GomI_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1o0PjILsZ1bPhiBRnAjbk3e3jtL5GomI_"
  },
  {
    "id": "drive-1RjZcB42_q3PdtQKRVUpmSGllhjvVJBOk",
    "name": "Panturrilha com Fase Excêntrica Lenta",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Negative Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RjZcB42_q3PdtQKRVUpmSGllhjvVJBOk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RjZcB42_q3PdtQKRVUpmSGllhjvVJBOk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RjZcB42_q3PdtQKRVUpmSGllhjvVJBOk"
  },
  {
    "id": "drive-1h1WOTYCn8a-28w7WgYZVRO35lzwnq59U",
    "name": "Panturrilha em Pe Maquina",
    "muscleGroup": "Panturrilha",
    "equipment": "Máquina",
    "instructions": "Execução de Panturrilha em Pe Maquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1h1WOTYCn8a-28w7WgYZVRO35lzwnq59U",
    "thumbnail": "https://lh3.googleusercontent.com/d/1h1WOTYCn8a-28w7WgYZVRO35lzwnq59U",
    "previewUrl": "https://lh3.googleusercontent.com/d/1h1WOTYCn8a-28w7WgYZVRO35lzwnq59U"
  },
  {
    "id": "drive-1fzmuLfp4-rbwI48cXpOJzmFe3cV_ABK8",
    "name": "Panturrilha Inclinada",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Panturrilha Inclinada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fzmuLfp4-rbwI48cXpOJzmFe3cV_ABK8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fzmuLfp4-rbwI48cXpOJzmFe3cV_ABK8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fzmuLfp4-rbwI48cXpOJzmFe3cV_ABK8"
  },
  {
    "id": "drive-10H6QeM8OuZtb5QqOd5fp1q89tiLcZhaI",
    "name": "Panturrilha Máquina",
    "muscleGroup": "Panturrilha",
    "equipment": "Máquina",
    "instructions": "Execução de Panturrilha Máquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10H6QeM8OuZtb5QqOd5fp1q89tiLcZhaI",
    "thumbnail": "https://lh3.googleusercontent.com/d/10H6QeM8OuZtb5QqOd5fp1q89tiLcZhaI",
    "previewUrl": "https://lh3.googleusercontent.com/d/10H6QeM8OuZtb5QqOd5fp1q89tiLcZhaI"
  },
  {
    "id": "drive-1n4yputzwmt1yPoJnkV1k9gi7EaP7946f",
    "name": "Panturrilha Sentado com Barra",
    "muscleGroup": "Panturrilha",
    "equipment": "Barra",
    "instructions": "Execução de Panturrilha Sentado com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1n4yputzwmt1yPoJnkV1k9gi7EaP7946f",
    "thumbnail": "https://lh3.googleusercontent.com/d/1n4yputzwmt1yPoJnkV1k9gi7EaP7946f",
    "previewUrl": "https://lh3.googleusercontent.com/d/1n4yputzwmt1yPoJnkV1k9gi7EaP7946f"
  },
  {
    "id": "drive-11KweNYcUIA8aXvas1Y5_VgMRKIWckDTG",
    "name": "Panturrilha Solo Unilateral",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Panturrilha Solo Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11KweNYcUIA8aXvas1Y5_VgMRKIWckDTG",
    "thumbnail": "https://lh3.googleusercontent.com/d/11KweNYcUIA8aXvas1Y5_VgMRKIWckDTG",
    "previewUrl": "https://lh3.googleusercontent.com/d/11KweNYcUIA8aXvas1Y5_VgMRKIWckDTG"
  },
  {
    "id": "drive-1yfZClWAJIU43IgNnRXnRcLLiyBSEmoxM",
    "name": "Panturrilha Unilateral no Leg Press",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Panturrilha Unilateral Leg. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yfZClWAJIU43IgNnRXnRcLLiyBSEmoxM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yfZClWAJIU43IgNnRXnRcLLiyBSEmoxM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yfZClWAJIU43IgNnRXnRcLLiyBSEmoxM"
  },
  {
    "id": "drive-1Ao-syNOaBFMZxXjLIw-xMkOWR1IcOG0_",
    "name": "Panturrilha Sentado com Haltere",
    "muscleGroup": "Panturrilha",
    "equipment": "Halteres",
    "instructions": "Execução de Seated Calf Raise Halter. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Ao-syNOaBFMZxXjLIw-xMkOWR1IcOG0_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Ao-syNOaBFMZxXjLIw-xMkOWR1IcOG0_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Ao-syNOaBFMZxXjLIw-xMkOWR1IcOG0_"
  },
  {
    "id": "drive-1oE3CAY7lnim5-s7uQ2UDHGeJhTb0k72q",
    "name": "Panturrilha Sentado (Sóleo)",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Seated Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1oE3CAY7lnim5-s7uQ2UDHGeJhTb0k72q",
    "thumbnail": "https://lh3.googleusercontent.com/d/1oE3CAY7lnim5-s7uQ2UDHGeJhTb0k72q",
    "previewUrl": "https://lh3.googleusercontent.com/d/1oE3CAY7lnim5-s7uQ2UDHGeJhTb0k72q"
  },
  {
    "id": "drive-13zPZpJaLfrvKMeWd3x6ptbr-PRRPqtsx",
    "name": "Panturrilha Unilateral em Pé",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Single Leg Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13zPZpJaLfrvKMeWd3x6ptbr-PRRPqtsx",
    "thumbnail": "https://lh3.googleusercontent.com/d/13zPZpJaLfrvKMeWd3x6ptbr-PRRPqtsx",
    "previewUrl": "https://lh3.googleusercontent.com/d/13zPZpJaLfrvKMeWd3x6ptbr-PRRPqtsx"
  },
  {
    "id": "drive-1Dsyhfx5bgvvYesCOLq6-doDOCgtyZuPj",
    "name": "Panturrilha no Smith",
    "muscleGroup": "Panturrilha",
    "equipment": "Máquina",
    "instructions": "Execução de Smith Machine Machine Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Dsyhfx5bgvvYesCOLq6-doDOCgtyZuPj",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Dsyhfx5bgvvYesCOLq6-doDOCgtyZuPj",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Dsyhfx5bgvvYesCOLq6-doDOCgtyZuPj"
  },
  {
    "id": "drive-1ZE0YPuytvK-OTkQKBj5-QdQv53jVROn2",
    "name": "Panturrilha em Pé na Máquina",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Standing Calf Raise (1). Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZE0YPuytvK-OTkQKBj5-QdQv53jVROn2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZE0YPuytvK-OTkQKBj5-QdQv53jVROn2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZE0YPuytvK-OTkQKBj5-QdQv53jVROn2"
  },
  {
    "id": "drive-1Pf3knJ_IRZj-01O4YocOTvTYzANo6-nY",
    "name": "Panturrilha em Pé",
    "muscleGroup": "Panturrilha",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Standing Calf Raise. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Pf3knJ_IRZj-01O4YocOTvTYzANo6-nY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Pf3knJ_IRZj-01O4YocOTvTYzANo6-nY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Pf3knJ_IRZj-01O4YocOTvTYzANo6-nY"
  },
  {
    "id": "drive-18uMScw0msqdGmS9MjCCf4PI5FfCj_5Nn",
    "name": "Flexão com Elástico",
    "muscleGroup": "Peito",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Flexão com Elástico. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18uMScw0msqdGmS9MjCCf4PI5FfCj_5Nn",
    "thumbnail": "https://lh3.googleusercontent.com/d/18uMScw0msqdGmS9MjCCf4PI5FfCj_5Nn",
    "previewUrl": "https://lh3.googleusercontent.com/d/18uMScw0msqdGmS9MjCCf4PI5FfCj_5Nn"
  },
  {
    "id": "drive-1zmvBdkpcHESZxbPrsM6IASjHRk6UQ3WJ",
    "name": "Supino Reto com Barra",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Supino Reto com Barra Side View. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zmvBdkpcHESZxbPrsM6IASjHRk6UQ3WJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zmvBdkpcHESZxbPrsM6IASjHRk6UQ3WJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zmvBdkpcHESZxbPrsM6IASjHRk6UQ3WJ"
  },
  {
    "id": "drive-1v-ySYs7F1r1c0F3yjzFQoT0a-DL5Mbf9",
    "name": "Supino Reto com Barra (Variação 2)",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Supino Reto com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1v-ySYs7F1r1c0F3yjzFQoT0a-DL5Mbf9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1v-ySYs7F1r1c0F3yjzFQoT0a-DL5Mbf9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1v-ySYs7F1r1c0F3yjzFQoT0a-DL5Mbf9"
  },
  {
    "id": "drive-1zaKBcw3uLqVF__jzmRoij_NNcd6ef3qT",
    "name": "Supino Declinado com Barra",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Supino Declinado com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zaKBcw3uLqVF__jzmRoij_NNcd6ef3qT",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zaKBcw3uLqVF__jzmRoij_NNcd6ef3qT",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zaKBcw3uLqVF__jzmRoij_NNcd6ef3qT"
  },
  {
    "id": "drive-1ARYpQi6qahj54lfHWCO3uewZqAc8kXH-",
    "name": "Barra Pullover",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Barra Pullover. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ARYpQi6qahj54lfHWCO3uewZqAc8kXH-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ARYpQi6qahj54lfHWCO3uewZqAc8kXH-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ARYpQi6qahj54lfHWCO3uewZqAc8kXH-"
  },
  {
    "id": "drive-1ZqPg_bLcf1Z3_VEhYtBSNP3AJ81jDKL4",
    "name": "Supino Reto com Pés Elevados",
    "muscleGroup": "Peito",
    "equipment": "Banco",
    "instructions": "Execução de Supino Feet Up. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZqPg_bLcf1Z3_VEhYtBSNP3AJ81jDKL4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZqPg_bLcf1Z3_VEhYtBSNP3AJ81jDKL4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZqPg_bLcf1Z3_VEhYtBSNP3AJ81jDKL4"
  },
  {
    "id": "drive-1GepLhHSyUvVkYeZGQ84cl-oY-YyiFqep",
    "name": "Cross Over na Polia Média/Alta",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Cross Over (1). Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GepLhHSyUvVkYeZGQ84cl-oY-YyiFqep",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GepLhHSyUvVkYeZGQ84cl-oY-YyiFqep",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GepLhHSyUvVkYeZGQ84cl-oY-YyiFqep"
  },
  {
    "id": "drive-1Zt4FL42dhVvb4M4cZ2ZBamGQkkECIW0P",
    "name": "Cross Over na Polia Alta",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Cross Over. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Zt4FL42dhVvb4M4cZ2ZBamGQkkECIW0P",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Zt4FL42dhVvb4M4cZ2ZBamGQkkECIW0P",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Zt4FL42dhVvb4M4cZ2ZBamGQkkECIW0P"
  },
  {
    "id": "drive-1ilhnfb1EQWvloTmrJfeGGTzHAdECSlPb",
    "name": "Crucifixo na Polia",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ilhnfb1EQWvloTmrJfeGGTzHAdECSlPb",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ilhnfb1EQWvloTmrJfeGGTzHAdECSlPb",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ilhnfb1EQWvloTmrJfeGGTzHAdECSlPb"
  },
  {
    "id": "drive-1QjROpHfkS-o8B13bwumh_IhQfAlF4YQA",
    "name": "Mergulho nas Paralelas (Foco Peitoral)",
    "muscleGroup": "Peito",
    "equipment": "Barras Paralelas",
    "instructions": "Execução de Chest Dips. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QjROpHfkS-o8B13bwumh_IhQfAlF4YQA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QjROpHfkS-o8B13bwumh_IhQfAlF4YQA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QjROpHfkS-o8B13bwumh_IhQfAlF4YQA"
  },
  {
    "id": "drive-1qcftSvIimLGaWGqhnkeBN_coXmPG37g6",
    "name": "Supino Sentado na Máquina",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Chest Press Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qcftSvIimLGaWGqhnkeBN_coXmPG37g6",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qcftSvIimLGaWGqhnkeBN_coXmPG37g6",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qcftSvIimLGaWGqhnkeBN_coXmPG37g6"
  },
  {
    "id": "drive-1kd_PEC0JMtcc7tkYqTLiDZS_JAiYBebr",
    "name": "Supino Reto na Máquina (Chest Press)",
    "muscleGroup": "Peito",
    "equipment": "Máquina",
    "instructions": "Execução de Chest Press Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kd_PEC0JMtcc7tkYqTLiDZS_JAiYBebr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kd_PEC0JMtcc7tkYqTLiDZS_JAiYBebr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kd_PEC0JMtcc7tkYqTLiDZS_JAiYBebr"
  },
  {
    "id": "drive-1GZWOqhs-KTrntBiokUBBouFa7EyTtvaa",
    "name": "Clapping Flexão de Braços",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Clapping Flexão de Braços. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GZWOqhs-KTrntBiokUBBouFa7EyTtvaa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GZWOqhs-KTrntBiokUBBouFa7EyTtvaa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GZWOqhs-KTrntBiokUBBouFa7EyTtvaa"
  },
  {
    "id": "drive-1rOHyPWKUv3Lq9ngoUH38bxMBKH92KOXQ",
    "name": "Crossover Inclinado",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Crossover Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rOHyPWKUv3Lq9ngoUH38bxMBKH92KOXQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rOHyPWKUv3Lq9ngoUH38bxMBKH92KOXQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rOHyPWKUv3Lq9ngoUH38bxMBKH92KOXQ"
  },
  {
    "id": "drive-14l08pPge7JFK05oLffhzzPMv0j4glFgt",
    "name": "Crossover",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Crossover. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14l08pPge7JFK05oLffhzzPMv0j4glFgt",
    "thumbnail": "https://lh3.googleusercontent.com/d/14l08pPge7JFK05oLffhzzPMv0j4glFgt",
    "previewUrl": "https://lh3.googleusercontent.com/d/14l08pPge7JFK05oLffhzzPMv0j4glFgt"
  },
  {
    "id": "drive-1V550gn01tSEYb-GSF2PRpHMqkrDN0kM_",
    "name": "Crucifixo Declindo Polia Baixa",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Crucifixo Declindo Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1V550gn01tSEYb-GSF2PRpHMqkrDN0kM_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1V550gn01tSEYb-GSF2PRpHMqkrDN0kM_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1V550gn01tSEYb-GSF2PRpHMqkrDN0kM_"
  },
  {
    "id": "drive-1m6Xqu9NufCHNj721TfLqOedaEmYOFHZP",
    "name": "Crucifixo Inclinado com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Crucifixo Inclinado com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1m6Xqu9NufCHNj721TfLqOedaEmYOFHZP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1m6Xqu9NufCHNj721TfLqOedaEmYOFHZP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1m6Xqu9NufCHNj721TfLqOedaEmYOFHZP"
  },
  {
    "id": "drive-1jIILbdVm9wemI5xpIPldm3xxSXXOf8d9",
    "name": "Crucifixo Polia Baixa",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Crucifixo Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jIILbdVm9wemI5xpIPldm3xxSXXOf8d9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jIILbdVm9wemI5xpIPldm3xxSXXOf8d9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jIILbdVm9wemI5xpIPldm3xxSXXOf8d9"
  },
  {
    "id": "drive-1jL4g2pHklcteqR0RsKt4aWM3JuU033un",
    "name": "Crucifixo",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Crucifixo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jL4g2pHklcteqR0RsKt4aWM3JuU033un",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jL4g2pHklcteqR0RsKt4aWM3JuU033un",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jL4g2pHklcteqR0RsKt4aWM3JuU033un"
  },
  {
    "id": "drive-14b_W8JfNeviF432_xZQxbziLAP6GVZho",
    "name": "Cruzamento Peito Unilateral",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Cruzamento Peito Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14b_W8JfNeviF432_xZQxbziLAP6GVZho",
    "thumbnail": "https://lh3.googleusercontent.com/d/14b_W8JfNeviF432_xZQxbziLAP6GVZho",
    "previewUrl": "https://lh3.googleusercontent.com/d/14b_W8JfNeviF432_xZQxbziLAP6GVZho"
  },
  {
    "id": "drive-1D4o5_7KvLd9sZ59_bSB5y7wjYCZt-F6O",
    "name": "Cruzamento Peito",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Cruzamento Peito. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1D4o5_7KvLd9sZ59_bSB5y7wjYCZt-F6O",
    "thumbnail": "https://lh3.googleusercontent.com/d/1D4o5_7KvLd9sZ59_bSB5y7wjYCZt-F6O",
    "previewUrl": "https://lh3.googleusercontent.com/d/1D4o5_7KvLd9sZ59_bSB5y7wjYCZt-F6O"
  },
  {
    "id": "drive-1DxhVYchs6m9tlxo41H1Fa4odQVSrD_NF",
    "name": "Cruzamento Polia Alta",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cruzamento Polia Alta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DxhVYchs6m9tlxo41H1Fa4odQVSrD_NF",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DxhVYchs6m9tlxo41H1Fa4odQVSrD_NF",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DxhVYchs6m9tlxo41H1Fa4odQVSrD_NF"
  },
  {
    "id": "drive-1VKvPlLp--uIAnGI2J0nrl-F5xR4wn91d",
    "name": "Cruzamento Polia Baixa",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cruzamento Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VKvPlLp--uIAnGI2J0nrl-F5xR4wn91d",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VKvPlLp--uIAnGI2J0nrl-F5xR4wn91d",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VKvPlLp--uIAnGI2J0nrl-F5xR4wn91d"
  },
  {
    "id": "drive-1u_QskIbzMkecAODoZKZgPxadHFkCj8VB",
    "name": "Crucifixo Declinado na Polia",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Decline Cabo / Polia Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1u_QskIbzMkecAODoZKZgPxadHFkCj8VB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1u_QskIbzMkecAODoZKZgPxadHFkCj8VB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1u_QskIbzMkecAODoZKZgPxadHFkCj8VB"
  },
  {
    "id": "drive-1wRrqNzHeGrN5XOx-eSJEjue0wUvzD3w1",
    "name": "Flexão de Braço Declinada",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Decline Flexão de Braço. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wRrqNzHeGrN5XOx-eSJEjue0wUvzD3w1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wRrqNzHeGrN5XOx-eSJEjue0wUvzD3w1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wRrqNzHeGrN5XOx-eSJEjue0wUvzD3w1"
  },
  {
    "id": "drive-1kSMvEx3rQcei1rkySiTfw7neu0RWdZNr",
    "name": "Deficit Flexão de Braços",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Deficit Flexão de Braços. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kSMvEx3rQcei1rkySiTfw7neu0RWdZNr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kSMvEx3rQcei1rkySiTfw7neu0RWdZNr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kSMvEx3rQcei1rkySiTfw7neu0RWdZNr"
  },
  {
    "id": "drive-1Y1Ze5bVmAeTndpzDM1SvJJntzT07Q1Ji",
    "name": "Crucifixo Reto com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Chest Fly Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Y1Ze5bVmAeTndpzDM1SvJJntzT07Q1Ji",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Y1Ze5bVmAeTndpzDM1SvJJntzT07Q1Ji",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Y1Ze5bVmAeTndpzDM1SvJJntzT07Q1Ji"
  },
  {
    "id": "drive-13ncWM6tRT1uFoPNDhHEyQPbo8-XpGUg9",
    "name": "Supino Reto com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Chest Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13ncWM6tRT1uFoPNDhHEyQPbo8-XpGUg9",
    "thumbnail": "https://lh3.googleusercontent.com/d/13ncWM6tRT1uFoPNDhHEyQPbo8-XpGUg9",
    "previewUrl": "https://lh3.googleusercontent.com/d/13ncWM6tRT1uFoPNDhHEyQPbo8-XpGUg9"
  },
  {
    "id": "drive-13sxyX-zEu1Uh5bijqI2YpLg5W8lONW0p",
    "name": "Supino no Solo (Floor Press) com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Floor Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13sxyX-zEu1Uh5bijqI2YpLg5W8lONW0p",
    "thumbnail": "https://lh3.googleusercontent.com/d/13sxyX-zEu1Uh5bijqI2YpLg5W8lONW0p",
    "previewUrl": "https://lh3.googleusercontent.com/d/13sxyX-zEu1Uh5bijqI2YpLg5W8lONW0p"
  },
  {
    "id": "drive-1TFtMpGPHORsZ84XNbFKu0eXMG_aKX5nK",
    "name": "Supino Fechado Hex Press com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Hex Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TFtMpGPHORsZ84XNbFKu0eXMG_aKX5nK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TFtMpGPHORsZ84XNbFKu0eXMG_aKX5nK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TFtMpGPHORsZ84XNbFKu0eXMG_aKX5nK"
  },
  {
    "id": "drive-1p3snJRe2FL5liHza1zeDCfcTKgJ_-qns",
    "name": "Supino Unilateral com Haltere",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Halter One Arm Chest Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1p3snJRe2FL5liHza1zeDCfcTKgJ_-qns",
    "thumbnail": "https://lh3.googleusercontent.com/d/1p3snJRe2FL5liHza1zeDCfcTKgJ_-qns",
    "previewUrl": "https://lh3.googleusercontent.com/d/1p3snJRe2FL5liHza1zeDCfcTKgJ_-qns"
  },
  {
    "id": "drive-1X-wey68k9Rvrs93gwQfw9D8RFMfhQo33",
    "name": "Halter Pullover",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Pullover. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1X-wey68k9Rvrs93gwQfw9D8RFMfhQo33",
    "thumbnail": "https://lh3.googleusercontent.com/d/1X-wey68k9Rvrs93gwQfw9D8RFMfhQo33",
    "previewUrl": "https://lh3.googleusercontent.com/d/1X-wey68k9Rvrs93gwQfw9D8RFMfhQo33"
  },
  {
    "id": "drive-11WbmeF7iaBbxPYsV6Dlo-LHZtOyv00Ew",
    "name": "Svend Press com Haltere/Anilha",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Svend Press. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11WbmeF7iaBbxPYsV6Dlo-LHZtOyv00Ew",
    "thumbnail": "https://lh3.googleusercontent.com/d/11WbmeF7iaBbxPYsV6Dlo-LHZtOyv00Ew",
    "previewUrl": "https://lh3.googleusercontent.com/d/11WbmeF7iaBbxPYsV6Dlo-LHZtOyv00Ew"
  },
  {
    "id": "drive-1pL5u5lDEWtH_dVI2HG6p3j4P94sHgRc0",
    "name": "Flexão Apoiado",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Apoiado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pL5u5lDEWtH_dVI2HG6p3j4P94sHgRc0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pL5u5lDEWtH_dVI2HG6p3j4P94sHgRc0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pL5u5lDEWtH_dVI2HG6p3j4P94sHgRc0"
  },
  {
    "id": "drive-1MALyjXi-dOnGh_6rwB3N-Tv5lk0mFQFo",
    "name": "Flexão Incliando",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Incliando. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MALyjXi-dOnGh_6rwB3N-Tv5lk0mFQFo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MALyjXi-dOnGh_6rwB3N-Tv5lk0mFQFo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MALyjXi-dOnGh_6rwB3N-Tv5lk0mFQFo"
  },
  {
    "id": "drive-1wDbm8CPfTSc676ZOp774ONPMg8tszR7u",
    "name": "Flexão na Parede",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão na Parede. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wDbm8CPfTSc676ZOp774ONPMg8tszR7u",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wDbm8CPfTSc676ZOp774ONPMg8tszR7u",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wDbm8CPfTSc676ZOp774ONPMg8tszR7u"
  },
  {
    "id": "drive-1jHk4MS1fJbs5WKVejopWJZNV05GdRe5W",
    "name": "Flexão Profunda",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão Profunda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jHk4MS1fJbs5WKVejopWJZNV05GdRe5W",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jHk4MS1fJbs5WKVejopWJZNV05GdRe5W",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jHk4MS1fJbs5WKVejopWJZNV05GdRe5W"
  },
  {
    "id": "drive-1qfwojE37qgDQI7_tBWyC0x5tFrV6Us7e",
    "name": "Handstand Pushup",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Handstand Pushup. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qfwojE37qgDQI7_tBWyC0x5tFrV6Us7e",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qfwojE37qgDQI7_tBWyC0x5tFrV6Us7e",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qfwojE37qgDQI7_tBWyC0x5tFrV6Us7e"
  },
  {
    "id": "drive-1Z55IheZ_kTT1Tj2hRAlWPqrM7LiU9tzK",
    "name": "Crucifixo Polia Alta (Cross Over)",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de High Cabo / Polia Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Z55IheZ_kTT1Tj2hRAlWPqrM7LiU9tzK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Z55IheZ_kTT1Tj2hRAlWPqrM7LiU9tzK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Z55IheZ_kTT1Tj2hRAlWPqrM7LiU9tzK"
  },
  {
    "id": "drive-1LRjbVQy8Rd2ryp26PGMq9rXYAr7Bb8QZ",
    "name": "Supino Inclinado no Smith",
    "muscleGroup": "Peito",
    "equipment": "Máquina",
    "instructions": "Execução de Inclinado no Smith Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LRjbVQy8Rd2ryp26PGMq9rXYAr7Bb8QZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LRjbVQy8Rd2ryp26PGMq9rXYAr7Bb8QZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LRjbVQy8Rd2ryp26PGMq9rXYAr7Bb8QZ"
  },
  {
    "id": "drive-1WDXSiA5R2AnZKy_afrFb3qBOvakU7EX3",
    "name": "Supino Inclinado com Barra",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Incline Supino Reto com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WDXSiA5R2AnZKy_afrFb3qBOvakU7EX3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WDXSiA5R2AnZKy_afrFb3qBOvakU7EX3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WDXSiA5R2AnZKy_afrFb3qBOvakU7EX3"
  },
  {
    "id": "drive-1teffFf2gTxsZlQsd46xpck4l7_kealKZ",
    "name": "Crucifixo Inclinado na Polia",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Incline Cabo / Polia Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1teffFf2gTxsZlQsd46xpck4l7_kealKZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1teffFf2gTxsZlQsd46xpck4l7_kealKZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1teffFf2gTxsZlQsd46xpck4l7_kealKZ"
  },
  {
    "id": "drive-14Au1t5_oplz8YR1_7rjtTVBl5fWfKkAv",
    "name": "Flexão de Braço Inclinada no Banco",
    "muscleGroup": "Peito",
    "equipment": "Banco",
    "instructions": "Execução de Incline Flexão de Braço Bench. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14Au1t5_oplz8YR1_7rjtTVBl5fWfKkAv",
    "thumbnail": "https://lh3.googleusercontent.com/d/14Au1t5_oplz8YR1_7rjtTVBl5fWfKkAv",
    "previewUrl": "https://lh3.googleusercontent.com/d/14Au1t5_oplz8YR1_7rjtTVBl5fWfKkAv"
  },
  {
    "id": "drive-1gdb21YsuiQFHaAE-sIW6lDeqoyVD_u1C",
    "name": "Remada Invertida na Barra",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Inverted Row. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gdb21YsuiQFHaAE-sIW6lDeqoyVD_u1C",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gdb21YsuiQFHaAE-sIW6lDeqoyVD_u1C",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gdb21YsuiQFHaAE-sIW6lDeqoyVD_u1C"
  },
  {
    "id": "drive-1rLQ86PyV8rm2LJxzNAioJzS8ddDqEN5F",
    "name": "Pullover com Kettlebell",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Kettlebell Pullover. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rLQ86PyV8rm2LJxzNAioJzS8ddDqEN5F",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rLQ86PyV8rm2LJxzNAioJzS8ddDqEN5F",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rLQ86PyV8rm2LJxzNAioJzS8ddDqEN5F"
  },
  {
    "id": "drive-1mWKTEt98YeaPJevJ_RlcHrYizfzkQnRx",
    "name": "Flexão de Braços com Joelhos Apoiados",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Knee Flexão de Braços. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mWKTEt98YeaPJevJ_RlcHrYizfzkQnRx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mWKTEt98YeaPJevJ_RlcHrYizfzkQnRx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mWKTEt98YeaPJevJ_RlcHrYizfzkQnRx"
  },
  {
    "id": "drive-1JoENRlbmcupnyg9PfewyEiJW9n4WOjoK",
    "name": "Pullover na Máquina Articulada",
    "muscleGroup": "Peito",
    "equipment": "Máquina",
    "instructions": "Execução de Lever Pullover Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JoENRlbmcupnyg9PfewyEiJW9n4WOjoK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JoENRlbmcupnyg9PfewyEiJW9n4WOjoK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JoENRlbmcupnyg9PfewyEiJW9n4WOjoK"
  },
  {
    "id": "drive-1aN3ZbeZR4xvKHJFHSbYpS6yg0cyI3tHc",
    "name": "Linha Invertida (Variação 2)",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Linha Invertida (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aN3ZbeZR4xvKHJFHSbYpS6yg0cyI3tHc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aN3ZbeZR4xvKHJFHSbYpS6yg0cyI3tHc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aN3ZbeZR4xvKHJFHSbYpS6yg0cyI3tHc"
  },
  {
    "id": "drive-1JBVxFuEhyWSSnkb5N-i-VnwNsEgrwinZ",
    "name": "Crucifixo na Polia Baixa",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Low Cabo / Polia Chest Flys. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JBVxFuEhyWSSnkb5N-i-VnwNsEgrwinZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JBVxFuEhyWSSnkb5N-i-VnwNsEgrwinZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JBVxFuEhyWSSnkb5N-i-VnwNsEgrwinZ"
  },
  {
    "id": "drive-15SV8nxvU8RprKJEkBPmT-n3HrYKh_RHd",
    "name": "Mergulho para Peitoral nas Paralelas",
    "muscleGroup": "Peito",
    "equipment": "Paralelas",
    "instructions": "Execução de Mergulho para Peitoral nas Paralelas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15SV8nxvU8RprKJEkBPmT-n3HrYKh_RHd",
    "thumbnail": "https://lh3.googleusercontent.com/d/15SV8nxvU8RprKJEkBPmT-n3HrYKh_RHd",
    "previewUrl": "https://lh3.googleusercontent.com/d/15SV8nxvU8RprKJEkBPmT-n3HrYKh_RHd"
  },
  {
    "id": "drive-17KjhMhg39d-q-s0_tP-UNvJHz1HogsTq",
    "name": "Máquina Prensa Peito",
    "muscleGroup": "Peito",
    "equipment": "Máquina",
    "instructions": "Execução de Máquina Prensa Peito. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17KjhMhg39d-q-s0_tP-UNvJHz1HogsTq",
    "thumbnail": "https://lh3.googleusercontent.com/d/17KjhMhg39d-q-s0_tP-UNvJHz1HogsTq",
    "previewUrl": "https://lh3.googleusercontent.com/d/17KjhMhg39d-q-s0_tP-UNvJHz1HogsTq"
  },
  {
    "id": "drive-1RuI2jF6BqFpY_oUM-Jayt1Y0DKX2VTTU",
    "name": "Crucifixo Unilateral com Haltere",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Crucifixo Unilateral com Haltere. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RuI2jF6BqFpY_oUM-Jayt1Y0DKX2VTTU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RuI2jF6BqFpY_oUM-Jayt1Y0DKX2VTTU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RuI2jF6BqFpY_oUM-Jayt1Y0DKX2VTTU"
  },
  {
    "id": "drive-1hMTNmkYJWmaAKs5m9cVMtXWfvpoFA02H",
    "name": "Voador (Peck Deck)",
    "muscleGroup": "Peito",
    "equipment": "Máquina",
    "instructions": "Execução de Voador (Peck Deck). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hMTNmkYJWmaAKs5m9cVMtXWfvpoFA02H",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hMTNmkYJWmaAKs5m9cVMtXWfvpoFA02H",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hMTNmkYJWmaAKs5m9cVMtXWfvpoFA02H"
  },
  {
    "id": "drive-1jgA3GZjVWPdyP9F1UfhjBHagJn0dsFK2",
    "name": "Flexão Pike (Ombros e Peitoral Superior)",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Flexão Pike (Ombros e Peitoral Superior). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jgA3GZjVWPdyP9F1UfhjBHagJn0dsFK2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jgA3GZjVWPdyP9F1UfhjBHagJn0dsFK2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jgA3GZjVWPdyP9F1UfhjBHagJn0dsFK2"
  },
  {
    "id": "drive-1jrm6y3OFQAxZ169y-2J9EIAfcXjFF-GP",
    "name": "Flexão de Braço Pliométrica (Explosiva)",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Flexão de Braço Pliométrica (Explosiva). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jrm6y3OFQAxZ169y-2J9EIAfcXjFF-GP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jrm6y3OFQAxZ169y-2J9EIAfcXjFF-GP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jrm6y3OFQAxZ169y-2J9EIAfcXjFF-GP"
  },
  {
    "id": "drive-1PgcHxAVfB7judPN0WD4hFMmSnaAsP5Bu",
    "name": "Supino Inclinado na Máquina",
    "muscleGroup": "Peito",
    "equipment": "Máquina",
    "instructions": "Execução de Supino Inclinado na Máquina. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PgcHxAVfB7judPN0WD4hFMmSnaAsP5Bu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PgcHxAVfB7judPN0WD4hFMmSnaAsP5Bu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PgcHxAVfB7judPN0WD4hFMmSnaAsP5Bu"
  },
  {
    "id": "drive-120LfddCA9IhYG1bd9pWsWYBqEMnOKd6S",
    "name": "Supino Inclinado Articulado",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Supino Inclinado Articulado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/120LfddCA9IhYG1bd9pWsWYBqEMnOKd6S",
    "thumbnail": "https://lh3.googleusercontent.com/d/120LfddCA9IhYG1bd9pWsWYBqEMnOKd6S",
    "previewUrl": "https://lh3.googleusercontent.com/d/120LfddCA9IhYG1bd9pWsWYBqEMnOKd6S"
  },
  {
    "id": "drive-1MgXMNsO4NlHRx2Riex9Sh0dJPWW7wnht",
    "name": "Supino Reto Articulado",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Supino Reto Articulado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MgXMNsO4NlHRx2Riex9Sh0dJPWW7wnht",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MgXMNsO4NlHRx2Riex9Sh0dJPWW7wnht",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MgXMNsO4NlHRx2Riex9Sh0dJPWW7wnht"
  },
  {
    "id": "drive-1sGTyEdXa7CR6lsLYdVjDMKx4Bb_2b9gR",
    "name": "Supino Articulado Unilateral",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Supino Articulado Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1sGTyEdXa7CR6lsLYdVjDMKx4Bb_2b9gR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1sGTyEdXa7CR6lsLYdVjDMKx4Bb_2b9gR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1sGTyEdXa7CR6lsLYdVjDMKx4Bb_2b9gR"
  },
  {
    "id": "drive-1WaHyFKMAJVN8-KOe_tOZfFX0lOCuO39n",
    "name": "Supino Pegada Fechada com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Supino Pegada Fechada com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WaHyFKMAJVN8-KOe_tOZfFX0lOCuO39n",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WaHyFKMAJVN8-KOe_tOZfFX0lOCuO39n",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WaHyFKMAJVN8-KOe_tOZfFX0lOCuO39n"
  },
  {
    "id": "drive-1AFeqIfUHUW7KT34RS-ZY7ynUwQh8xocU",
    "name": "Crucifixo na Polia Pegada Pronada",
    "muscleGroup": "Peito",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Crucifixo na Polia Pegada Pronada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AFeqIfUHUW7KT34RS-ZY7ynUwQh8xocU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AFeqIfUHUW7KT34RS-ZY7ynUwQh8xocU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AFeqIfUHUW7KT34RS-ZY7ynUwQh8xocU"
  },
  {
    "id": "drive-1GauTLbs3JcJkkaI1qOO5mCBIEGbBpKqS",
    "name": "Pullover no Banco com Haltere",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Pullover no Banco com Haltere. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GauTLbs3JcJkkaI1qOO5mCBIEGbBpKqS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GauTLbs3JcJkkaI1qOO5mCBIEGbBpKqS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GauTLbs3JcJkkaI1qOO5mCBIEGbBpKqS"
  },
  {
    "id": "drive-1qi9Aov30ZfpKsPiTADCQDWsHo51ztkBR",
    "name": "Pullover na Bola Suíça",
    "muscleGroup": "Peito",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Pullover na Bola Suíça. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qi9Aov30ZfpKsPiTADCQDWsHo51ztkBR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qi9Aov30ZfpKsPiTADCQDWsHo51ztkBR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qi9Aov30ZfpKsPiTADCQDWsHo51ztkBR"
  },
  {
    "id": "drive-1tsit3vs4CmXBBAQkoV4gYcJz8aBulENu",
    "name": "Flexão de Braço no Apoio (Push-Up Bars)",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Flexão de Braço no Apoio (Push-Up Bars). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1tsit3vs4CmXBBAQkoV4gYcJz8aBulENu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1tsit3vs4CmXBBAQkoV4gYcJz8aBulENu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1tsit3vs4CmXBBAQkoV4gYcJz8aBulENu"
  },
  {
    "id": "drive-18g07phGJmjZbvfXoHLzLiFHVtcNG_UFO",
    "name": "Supino Reto no Smith",
    "muscleGroup": "Peito",
    "equipment": "Máquina Smith",
    "instructions": "Execução de Supino Reto no Smith. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18g07phGJmjZbvfXoHLzLiFHVtcNG_UFO",
    "thumbnail": "https://lh3.googleusercontent.com/d/18g07phGJmjZbvfXoHLzLiFHVtcNG_UFO",
    "previewUrl": "https://lh3.googleusercontent.com/d/18g07phGJmjZbvfXoHLzLiFHVtcNG_UFO"
  },
  {
    "id": "drive-1k8PR2s1jtUv0qxd1F9cgC54sK8L8hTUc",
    "name": "Supino Alternado com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Supino Alternado com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1k8PR2s1jtUv0qxd1F9cgC54sK8L8hTUc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1k8PR2s1jtUv0qxd1F9cgC54sK8L8hTUc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1k8PR2s1jtUv0qxd1F9cgC54sK8L8hTUc"
  },
  {
    "id": "drive-1aHSjf12FogggLnSTDM35lWXKYLgnbG9W",
    "name": "Supino Reto com Halteres (Variação 2)",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Supino Reto com Halteres (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aHSjf12FogggLnSTDM35lWXKYLgnbG9W",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aHSjf12FogggLnSTDM35lWXKYLgnbG9W",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aHSjf12FogggLnSTDM35lWXKYLgnbG9W"
  },
  {
    "id": "drive-15lkRRNP13eFD8Ik30HSzjOsuTuIcRn6V",
    "name": "Supino Declinado no Smith",
    "muscleGroup": "Peito",
    "equipment": "Máquina Smith",
    "instructions": "Execução de Supino Declinado no Smith. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15lkRRNP13eFD8Ik30HSzjOsuTuIcRn6V",
    "thumbnail": "https://lh3.googleusercontent.com/d/15lkRRNP13eFD8Ik30HSzjOsuTuIcRn6V",
    "previewUrl": "https://lh3.googleusercontent.com/d/15lkRRNP13eFD8Ik30HSzjOsuTuIcRn6V"
  },
  {
    "id": "drive-13mFg0oFxD0FadwWho6TnAaG86O21aui1",
    "name": "Supino Declinado com Barra (Variação 2)",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Supino Declinado com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13mFg0oFxD0FadwWho6TnAaG86O21aui1",
    "thumbnail": "https://lh3.googleusercontent.com/d/13mFg0oFxD0FadwWho6TnAaG86O21aui1",
    "previewUrl": "https://lh3.googleusercontent.com/d/13mFg0oFxD0FadwWho6TnAaG86O21aui1"
  },
  {
    "id": "drive-1QKmNVguyJY_HJ8plwU0PwggSswfgVrmz",
    "name": "Supino Inclinado com Halteres",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Supino Inclinado com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QKmNVguyJY_HJ8plwU0PwggSswfgVrmz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QKmNVguyJY_HJ8plwU0PwggSswfgVrmz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QKmNVguyJY_HJ8plwU0PwggSswfgVrmz"
  },
  {
    "id": "drive-1aAdMFUsZ5L1i-GgM2-k1NX3ev3qhyhUR",
    "name": "Supino Inclinado com Barra (Variação 2)",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Supino Inclinado com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aAdMFUsZ5L1i-GgM2-k1NX3ev3qhyhUR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aAdMFUsZ5L1i-GgM2-k1NX3ev3qhyhUR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aAdMFUsZ5L1i-GgM2-k1NX3ev3qhyhUR"
  },
  {
    "id": "drive-1GbMJ5FITCQ10KHdIYelrjhQRgwzWc8r8",
    "name": "Supino Reto com Barra (Variação 3)",
    "muscleGroup": "Peito",
    "equipment": "Barra",
    "instructions": "Execução de Supino Reto com Barra (Variação 3). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GbMJ5FITCQ10KHdIYelrjhQRgwzWc8r8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GbMJ5FITCQ10KHdIYelrjhQRgwzWc8r8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GbMJ5FITCQ10KHdIYelrjhQRgwzWc8r8"
  },
  {
    "id": "drive-1LiYDDU5frrYSBcyBWgPPeFE2PF7IdpaV",
    "name": "Svend Press com Anilha",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Svend Press com Anilha. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LiYDDU5frrYSBcyBWgPPeFE2PF7IdpaV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LiYDDU5frrYSBcyBWgPPeFE2PF7IdpaV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LiYDDU5frrYSBcyBWgPPeFE2PF7IdpaV"
  },
  {
    "id": "drive-1bJiHz2H7AWPFacrYZuBQ3dGY-H_jRU0f",
    "name": "Svend Press Isométrico",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Svend Press Isométrico. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bJiHz2H7AWPFacrYZuBQ3dGY-H_jRU0f",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bJiHz2H7AWPFacrYZuBQ3dGY-H_jRU0f",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bJiHz2H7AWPFacrYZuBQ3dGY-H_jRU0f"
  },
  {
    "id": "drive-1DMTXMAmkHxWUp9QMqSNSNedwzXQHl8SU",
    "name": "Voador / Crucifixo na Máquina",
    "muscleGroup": "Peito",
    "equipment": "Máquina",
    "instructions": "Execução de Voador / Crucifixo na Máquina. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DMTXMAmkHxWUp9QMqSNSNedwzXQHl8SU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DMTXMAmkHxWUp9QMqSNSNedwzXQHl8SU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DMTXMAmkHxWUp9QMqSNSNedwzXQHl8SU"
  },
  {
    "id": "drive-1W96fpnFwQmT7_MbdQ7OhFJ1BWeE0Ms0A",
    "name": "Crucifixo Reto com Halteres (Variação 2)",
    "muscleGroup": "Peito",
    "equipment": "Halteres",
    "instructions": "Execução de Crucifixo Reto com Halteres (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1W96fpnFwQmT7_MbdQ7OhFJ1BWeE0Ms0A",
    "thumbnail": "https://lh3.googleusercontent.com/d/1W96fpnFwQmT7_MbdQ7OhFJ1BWeE0Ms0A",
    "previewUrl": "https://lh3.googleusercontent.com/d/1W96fpnFwQmT7_MbdQ7OhFJ1BWeE0Ms0A"
  },
  {
    "id": "drive-15YBFZn55iPWpW874OgZGbP3ywKao3IKD",
    "name": "Flexão de Braço na Parede",
    "muscleGroup": "Peito",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Flexão de Braço na Parede. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15YBFZn55iPWpW874OgZGbP3ywKao3IKD",
    "thumbnail": "https://lh3.googleusercontent.com/d/15YBFZn55iPWpW874OgZGbP3ywKao3IKD",
    "previewUrl": "https://lh3.googleusercontent.com/d/15YBFZn55iPWpW874OgZGbP3ywKao3IKD"
  },
  {
    "id": "drive-1OahO0whrrsIik8zJEflQkaacNKKWM4RU",
    "name": "Mergulho nas Paralelas com Carga",
    "muscleGroup": "Peito",
    "equipment": "Paralelas",
    "instructions": "Execução de Mergulho nas Paralelas com Carga. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1OahO0whrrsIik8zJEflQkaacNKKWM4RU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1OahO0whrrsIik8zJEflQkaacNKKWM4RU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1OahO0whrrsIik8zJEflQkaacNKKWM4RU"
  },
  {
    "id": "drive-1AazJbPACH1vRodXasM5gkj_-1C0v1dp3",
    "name": "Tríceps Pulley com Elástico",
    "muscleGroup": "Tríceps",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Tríceps Pulley com Elástico. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AazJbPACH1vRodXasM5gkj_-1C0v1dp3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AazJbPACH1vRodXasM5gkj_-1C0v1dp3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AazJbPACH1vRodXasM5gkj_-1C0v1dp3"
  },
  {
    "id": "drive-1hVdkEYvAu-B1EP7L1TGN8syoKBSoM28p",
    "name": "Mergulho no Banco",
    "muscleGroup": "Tríceps",
    "equipment": "Banco",
    "instructions": "Execução de Mergulho no Banco. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hVdkEYvAu-B1EP7L1TGN8syoKBSoM28p",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hVdkEYvAu-B1EP7L1TGN8syoKBSoM28p",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hVdkEYvAu-B1EP7L1TGN8syoKBSoM28p"
  },
  {
    "id": "drive-1A_LcST9d6PJZZMEJWIKDZKd-rVlZRZGy",
    "name": "Mergulho no Banco (Variação 2)",
    "muscleGroup": "Tríceps",
    "equipment": "Banco",
    "instructions": "Execução de Mergulho no Banco (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1A_LcST9d6PJZZMEJWIKDZKd-rVlZRZGy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1A_LcST9d6PJZZMEJWIKDZKd-rVlZRZGy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1A_LcST9d6PJZZMEJWIKDZKd-rVlZRZGy"
  },
  {
    "id": "drive-1a2yLKaRSyTNZQqLtDhmQgmV3BE5WvHDh",
    "name": "Tríceps Testa no Cabo",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Testa no Cabo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1a2yLKaRSyTNZQqLtDhmQgmV3BE5WvHDh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1a2yLKaRSyTNZQqLtDhmQgmV3BE5WvHDh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1a2yLKaRSyTNZQqLtDhmQgmV3BE5WvHDh"
  },
  {
    "id": "drive-1J6trLzXMBvXgKQ-EAAJ5d73pz_DUqJk2",
    "name": "Tríceps Coice na Polia",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Tricep Kickback. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1J6trLzXMBvXgKQ-EAAJ5d73pz_DUqJk2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1J6trLzXMBvXgKQ-EAAJ5d73pz_DUqJk2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1J6trLzXMBvXgKQ-EAAJ5d73pz_DUqJk2"
  },
  {
    "id": "drive-1C0ZTd90rgMDCYY5jdvMsIhhwrDK5Yxk8",
    "name": "Tríceps Francês na Polia",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Tricep Overhead Extensãos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1C0ZTd90rgMDCYY5jdvMsIhhwrDK5Yxk8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1C0ZTd90rgMDCYY5jdvMsIhhwrDK5Yxk8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1C0ZTd90rgMDCYY5jdvMsIhhwrDK5Yxk8"
  },
  {
    "id": "drive-1pyeCWBogbSwEg1cjZcfuuGTcAwJUPh-w",
    "name": "Tríceps Pulley Barra Reta",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo / Polia Tricep Pushdown. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1pyeCWBogbSwEg1cjZcfuuGTcAwJUPh-w",
    "thumbnail": "https://lh3.googleusercontent.com/d/1pyeCWBogbSwEg1cjZcfuuGTcAwJUPh-w",
    "previewUrl": "https://lh3.googleusercontent.com/d/1pyeCWBogbSwEg1cjZcfuuGTcAwJUPh-w"
  },
  {
    "id": "drive-14UJRHyDoZDVWPG_XmjpLqtehmqaAjIwm",
    "name": "Supino Fechado para Tríceps",
    "muscleGroup": "Tríceps",
    "equipment": "Banco",
    "instructions": "Execução de Close Grip Supino Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14UJRHyDoZDVWPG_XmjpLqtehmqaAjIwm",
    "thumbnail": "https://lh3.googleusercontent.com/d/14UJRHyDoZDVWPG_XmjpLqtehmqaAjIwm",
    "previewUrl": "https://lh3.googleusercontent.com/d/14UJRHyDoZDVWPG_XmjpLqtehmqaAjIwm"
  },
  {
    "id": "drive-1v2-7lsO4Iisj6f5qrwAFoYtWcOgI_3wy",
    "name": "Coice Curvado",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Coice Curvado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1v2-7lsO4Iisj6f5qrwAFoYtWcOgI_3wy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1v2-7lsO4Iisj6f5qrwAFoYtWcOgI_3wy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1v2-7lsO4Iisj6f5qrwAFoYtWcOgI_3wy"
  },
  {
    "id": "drive-13fkJz4mJyHEuOJP9zYp3-VU5Rten_DEX",
    "name": "Corda Polia Alta",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Corda Polia Alta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13fkJz4mJyHEuOJP9zYp3-VU5Rten_DEX",
    "thumbnail": "https://lh3.googleusercontent.com/d/13fkJz4mJyHEuOJP9zYp3-VU5Rten_DEX",
    "previewUrl": "https://lh3.googleusercontent.com/d/13fkJz4mJyHEuOJP9zYp3-VU5Rten_DEX"
  },
  {
    "id": "drive-1oDq0wSKAiXtSo_Rih2l2ezpE9Y9_OXRl",
    "name": "Diamond Pushup",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Diamond Pushup. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1oDq0wSKAiXtSo_Rih2l2ezpE9Y9_OXRl",
    "thumbnail": "https://lh3.googleusercontent.com/d/1oDq0wSKAiXtSo_Rih2l2ezpE9Y9_OXRl",
    "previewUrl": "https://lh3.googleusercontent.com/d/1oDq0wSKAiXtSo_Rih2l2ezpE9Y9_OXRl"
  },
  {
    "id": "drive-1QDqN7boWWuIlJgzmUnW1KUQh0NMkTqYL",
    "name": "Tríceps Coice com Haltere",
    "muscleGroup": "Tríceps",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Tricep Kickback. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QDqN7boWWuIlJgzmUnW1KUQh0NMkTqYL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QDqN7boWWuIlJgzmUnW1KUQh0NMkTqYL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QDqN7boWWuIlJgzmUnW1KUQh0NMkTqYL"
  },
  {
    "id": "drive-1XEDFyjKXGcR-kitbeNz522-3OQ9TeBEr",
    "name": "Tríceps Pulley com Barra W",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Ez Bar Tricep Pushdown. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XEDFyjKXGcR-kitbeNz522-3OQ9TeBEr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XEDFyjKXGcR-kitbeNz522-3OQ9TeBEr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XEDFyjKXGcR-kitbeNz522-3OQ9TeBEr"
  },
  {
    "id": "drive-1e7g7WqEiF71VImkbZ7XsfxrRvVt4WSWG",
    "name": "Tríceps Francês com Haltere",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Francesa Dumbell. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1e7g7WqEiF71VImkbZ7XsfxrRvVt4WSWG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1e7g7WqEiF71VImkbZ7XsfxrRvVt4WSWG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1e7g7WqEiF71VImkbZ7XsfxrRvVt4WSWG"
  },
  {
    "id": "drive-1BSn6-ta8WC4Wyx7iRHJCbYxnjNFqJTye",
    "name": "Handstand Flexão de Braço",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Handstand Flexão de Braço. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BSn6-ta8WC4Wyx7iRHJCbYxnjNFqJTye",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BSn6-ta8WC4Wyx7iRHJCbYxnjNFqJTye",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BSn6-ta8WC4Wyx7iRHJCbYxnjNFqJTye"
  },
  {
    "id": "drive-1E_HWj1PfPmwK7NoSba2d2DFHo6hXU-ls",
    "name": "Tríceps Coice com Haltere (Variação 2)",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Coice com Haltere (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1E_HWj1PfPmwK7NoSba2d2DFHo6hXU-ls",
    "thumbnail": "https://lh3.googleusercontent.com/d/1E_HWj1PfPmwK7NoSba2d2DFHo6hXU-ls",
    "previewUrl": "https://lh3.googleusercontent.com/d/1E_HWj1PfPmwK7NoSba2d2DFHo6hXU-ls"
  },
  {
    "id": "drive-1OeG2KqKIWLpY6cYYVlaZkt6RmCp093AN",
    "name": "Mergulho Assistido",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Mergulho Assistido. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1OeG2KqKIWLpY6cYYVlaZkt6RmCp093AN",
    "thumbnail": "https://lh3.googleusercontent.com/d/1OeG2KqKIWLpY6cYYVlaZkt6RmCp093AN",
    "previewUrl": "https://lh3.googleusercontent.com/d/1OeG2KqKIWLpY6cYYVlaZkt6RmCp093AN"
  },
  {
    "id": "drive-1XBp_E5xnJctnGsoHnBylxww4DnD8E8am",
    "name": "Tríceps Francês Acima da Cabeça na Polia",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Overhead Cabo / Polia Tricep Extensão. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XBp_E5xnJctnGsoHnBylxww4DnD8E8am",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XBp_E5xnJctnGsoHnBylxww4DnD8E8am",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XBp_E5xnJctnGsoHnBylxww4DnD8E8am"
  },
  {
    "id": "drive-1UCSH7jeFYLLwInZODJKgskpMmwlCOrls",
    "name": "Sphinx Flexão de Braço",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Sphinx Flexão de Braço. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UCSH7jeFYLLwInZODJKgskpMmwlCOrls",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UCSH7jeFYLLwInZODJKgskpMmwlCOrls",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UCSH7jeFYLLwInZODJKgskpMmwlCOrls"
  },
  {
    "id": "drive-1IkWxvMWu0FNqnIQRsyChonl6JSEt0yCe",
    "name": "Tríceps Pulley Barra Reta (Variação 2)",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Pulley Barra Reta (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IkWxvMWu0FNqnIQRsyChonl6JSEt0yCe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IkWxvMWu0FNqnIQRsyChonl6JSEt0yCe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IkWxvMWu0FNqnIQRsyChonl6JSEt0yCe"
  },
  {
    "id": "drive-1Wf_8mT82CbCpL9d0R-LUTK-O8AqgssIn",
    "name": "Tríceps Pulley Barra Reta (Variação 3)",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Pulley Barra Reta (Variação 3). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Wf_8mT82CbCpL9d0R-LUTK-O8AqgssIn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Wf_8mT82CbCpL9d0R-LUTK-O8AqgssIn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Wf_8mT82CbCpL9d0R-LUTK-O8AqgssIn"
  },
  {
    "id": "drive-1LI3HGCP-MiSasmJXDuFKG45OWTHtFjrQ",
    "name": "Testa Barra Reta",
    "muscleGroup": "Tríceps",
    "equipment": "Barra",
    "instructions": "Execução de Testa Barra Reta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LI3HGCP-MiSasmJXDuFKG45OWTHtFjrQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LI3HGCP-MiSasmJXDuFKG45OWTHtFjrQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LI3HGCP-MiSasmJXDuFKG45OWTHtFjrQ"
  },
  {
    "id": "drive-1P-f137bhCLX6MbEpIGLLq_5q-fxnJWjc",
    "name": "Testa com Halteres",
    "muscleGroup": "Tríceps",
    "equipment": "Halteres",
    "instructions": "Execução de Testa com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1P-f137bhCLX6MbEpIGLLq_5q-fxnJWjc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1P-f137bhCLX6MbEpIGLLq_5q-fxnJWjc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1P-f137bhCLX6MbEpIGLLq_5q-fxnJWjc"
  },
  {
    "id": "drive-1WMMoGi-0uHQ6SMxQQ-IaCmyjCMaHFUxt",
    "name": "Testa Fechado",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Testa Fechado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WMMoGi-0uHQ6SMxQQ-IaCmyjCMaHFUxt",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WMMoGi-0uHQ6SMxQQ-IaCmyjCMaHFUxt",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WMMoGi-0uHQ6SMxQQ-IaCmyjCMaHFUxt"
  },
  {
    "id": "drive-10n3CgcdZTz5xoV2sByhT62Ojs5jnUs0B",
    "name": "Tríceps Testa Unilateral com Haltere",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Testa Unilateral Dumbell. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10n3CgcdZTz5xoV2sByhT62Ojs5jnUs0B",
    "thumbnail": "https://lh3.googleusercontent.com/d/10n3CgcdZTz5xoV2sByhT62Ojs5jnUs0B",
    "previewUrl": "https://lh3.googleusercontent.com/d/10n3CgcdZTz5xoV2sByhT62Ojs5jnUs0B"
  },
  {
    "id": "drive-1W4-NQRzMZmyqsQ_PlMbWTPOaK_c6n3eq",
    "name": "Tríceps Francês Acima da Cabeça",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tricep Overhead Extensãos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1W4-NQRzMZmyqsQ_PlMbWTPOaK_c6n3eq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1W4-NQRzMZmyqsQ_PlMbWTPOaK_c6n3eq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1W4-NQRzMZmyqsQ_PlMbWTPOaK_c6n3eq"
  },
  {
    "id": "drive-1IfRb1GIgfKDHCXTqWrtolpjKX6Accz9p",
    "name": "Tríceps 2 Bancos",
    "muscleGroup": "Tríceps",
    "equipment": "Banco",
    "instructions": "Execução de Tríceps 2 Bancos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IfRb1GIgfKDHCXTqWrtolpjKX6Accz9p",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IfRb1GIgfKDHCXTqWrtolpjKX6Accz9p",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IfRb1GIgfKDHCXTqWrtolpjKX6Accz9p"
  },
  {
    "id": "drive-1ujOWxtsRdRxcLs5FzLu1wnAj2HYtIai7",
    "name": "Tríceps Banco de Apoio",
    "muscleGroup": "Tríceps",
    "equipment": "Banco",
    "instructions": "Execução de Tríceps Banco de Apoio. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ujOWxtsRdRxcLs5FzLu1wnAj2HYtIai7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ujOWxtsRdRxcLs5FzLu1wnAj2HYtIai7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ujOWxtsRdRxcLs5FzLu1wnAj2HYtIai7"
  },
  {
    "id": "drive-1ugGNoW0lxurhU5OqdlCYe5d1GOzcHu_R",
    "name": "Tríceps Barra W em Pé",
    "muscleGroup": "Tríceps",
    "equipment": "Barra",
    "instructions": "Execução de Tríceps Barra W em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ugGNoW0lxurhU5OqdlCYe5d1GOzcHu_R",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ugGNoW0lxurhU5OqdlCYe5d1GOzcHu_R",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ugGNoW0lxurhU5OqdlCYe5d1GOzcHu_R"
  },
  {
    "id": "drive-1Qicyy7e6jT5loSNiMoZNko5sizpSof7u",
    "name": "Tríceps Base",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Base. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Qicyy7e6jT5loSNiMoZNko5sizpSof7u",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Qicyy7e6jT5loSNiMoZNko5sizpSof7u",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Qicyy7e6jT5loSNiMoZNko5sizpSof7u"
  },
  {
    "id": "drive-1bcgn7ccYi_CZcl17cTcQ2mFn_Geh6z-Z",
    "name": "Tríceps Chão",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Chão. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bcgn7ccYi_CZcl17cTcQ2mFn_Geh6z-Z",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bcgn7ccYi_CZcl17cTcQ2mFn_Geh6z-Z",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bcgn7ccYi_CZcl17cTcQ2mFn_Geh6z-Z"
  },
  {
    "id": "drive-1aT-hSWk3jMc3XqW0SZg9PwFVzkGORoBK",
    "name": "Tríceps Concentrado",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Concentrado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aT-hSWk3jMc3XqW0SZg9PwFVzkGORoBK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aT-hSWk3jMc3XqW0SZg9PwFVzkGORoBK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aT-hSWk3jMc3XqW0SZg9PwFVzkGORoBK"
  },
  {
    "id": "drive-1M-pbXzGsTNgh4xS8lITmaLjHyrwECOWH",
    "name": "Tríceps Corda Polia Baixa",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Corda Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1M-pbXzGsTNgh4xS8lITmaLjHyrwECOWH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1M-pbXzGsTNgh4xS8lITmaLjHyrwECOWH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1M-pbXzGsTNgh4xS8lITmaLjHyrwECOWH"
  },
  {
    "id": "drive-1CUu1CGLFwM6tXCPTAML5s0IoFrzqO4z1",
    "name": "Tríceps Corda",
    "muscleGroup": "Tríceps",
    "equipment": "Corda Naval",
    "instructions": "Execução de Tríceps Corda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CUu1CGLFwM6tXCPTAML5s0IoFrzqO4z1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CUu1CGLFwM6tXCPTAML5s0IoFrzqO4z1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CUu1CGLFwM6tXCPTAML5s0IoFrzqO4z1"
  },
  {
    "id": "drive-1NhBqegfgxf_tH1yBjl2PbOuKB3DHb-AA",
    "name": "Tríceps Extensão na Polia",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Extensão na Polia. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NhBqegfgxf_tH1yBjl2PbOuKB3DHb-AA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NhBqegfgxf_tH1yBjl2PbOuKB3DHb-AA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NhBqegfgxf_tH1yBjl2PbOuKB3DHb-AA"
  },
  {
    "id": "drive-14hGTZ12Ejgv_vWh_LlpWLuySuPQy3OMW",
    "name": "Tríceps Extensão Sentado",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Extensão Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14hGTZ12Ejgv_vWh_LlpWLuySuPQy3OMW",
    "thumbnail": "https://lh3.googleusercontent.com/d/14hGTZ12Ejgv_vWh_LlpWLuySuPQy3OMW",
    "previewUrl": "https://lh3.googleusercontent.com/d/14hGTZ12Ejgv_vWh_LlpWLuySuPQy3OMW"
  },
  {
    "id": "drive-1vVkDmpyNuREtQGf5Q7hCtI7MIa-pOohR",
    "name": "Tríceps Francês Polia Baixaa",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Francês Polia Baixaa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1vVkDmpyNuREtQGf5Q7hCtI7MIa-pOohR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1vVkDmpyNuREtQGf5Q7hCtI7MIa-pOohR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1vVkDmpyNuREtQGf5Q7hCtI7MIa-pOohR"
  },
  {
    "id": "drive-1FShZ5BGshuQU_xIlunf4euZtcUSPFxeK",
    "name": "Tríceps Inclinado com Halteres",
    "muscleGroup": "Tríceps",
    "equipment": "Halteres",
    "instructions": "Execução de Tríceps Inclinado com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FShZ5BGshuQU_xIlunf4euZtcUSPFxeK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FShZ5BGshuQU_xIlunf4euZtcUSPFxeK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FShZ5BGshuQU_xIlunf4euZtcUSPFxeK"
  },
  {
    "id": "drive-1R2Hl8yu-5A2Nno5dBB0gTh5uU9Cafgc4",
    "name": "Tríceps Testa no Banco Inclinado com Halteres",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Inclinado Dumbell. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1R2Hl8yu-5A2Nno5dBB0gTh5uU9Cafgc4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1R2Hl8yu-5A2Nno5dBB0gTh5uU9Cafgc4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1R2Hl8yu-5A2Nno5dBB0gTh5uU9Cafgc4"
  },
  {
    "id": "drive-1PLJWLplOrbtErymH2xiBsDGXgAG6qt7r",
    "name": "Tríceps Inclinado Extensão",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Inclinado Extensão. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PLJWLplOrbtErymH2xiBsDGXgAG6qt7r",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PLJWLplOrbtErymH2xiBsDGXgAG6qt7r",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PLJWLplOrbtErymH2xiBsDGXgAG6qt7r"
  },
  {
    "id": "drive-1UZ7ntBn7kZQxS3hlA57GcUagzPL3cdg5",
    "name": "Tríceps Inclinado Polia Baixa",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Inclinado Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UZ7ntBn7kZQxS3hlA57GcUagzPL3cdg5",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UZ7ntBn7kZQxS3hlA57GcUagzPL3cdg5",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UZ7ntBn7kZQxS3hlA57GcUagzPL3cdg5"
  },
  {
    "id": "drive-1az8AxrlrivLvsdXQD87ZpN40O-oTmKSw",
    "name": "Tríceps na Máquina",
    "muscleGroup": "Tríceps",
    "equipment": "Máquina",
    "instructions": "Execução de Tríceps Machine. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1az8AxrlrivLvsdXQD87ZpN40O-oTmKSw",
    "thumbnail": "https://lh3.googleusercontent.com/d/1az8AxrlrivLvsdXQD87ZpN40O-oTmKSw",
    "previewUrl": "https://lh3.googleusercontent.com/d/1az8AxrlrivLvsdXQD87ZpN40O-oTmKSw"
  },
  {
    "id": "drive-15xXwdS5CsA-8-sKkRPQnN-AW0LWPoGVJ",
    "name": "Tríceps Mergulho",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Mergulho. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15xXwdS5CsA-8-sKkRPQnN-AW0LWPoGVJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/15xXwdS5CsA-8-sKkRPQnN-AW0LWPoGVJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/15xXwdS5CsA-8-sKkRPQnN-AW0LWPoGVJ"
  },
  {
    "id": "drive-1UtIx6Cr2Q9gJvkG42ii8BpwJNe_A3tyr",
    "name": "Tríceps Máquina",
    "muscleGroup": "Tríceps",
    "equipment": "Máquina",
    "instructions": "Execução de Tríceps Máquina. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UtIx6Cr2Q9gJvkG42ii8BpwJNe_A3tyr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UtIx6Cr2Q9gJvkG42ii8BpwJNe_A3tyr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UtIx6Cr2Q9gJvkG42ii8BpwJNe_A3tyr"
  },
  {
    "id": "drive-1xZkpaSsvnEGA5RQkgpCO2n31iz5lsr0E",
    "name": "Tríceps na Paralela",
    "muscleGroup": "Tríceps",
    "equipment": "Barras Paralelas",
    "instructions": "Execução de Tríceps na Paralela. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xZkpaSsvnEGA5RQkgpCO2n31iz5lsr0E",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xZkpaSsvnEGA5RQkgpCO2n31iz5lsr0E",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xZkpaSsvnEGA5RQkgpCO2n31iz5lsr0E"
  },
  {
    "id": "drive-1XtipRx7YdKSZVEgcFlJYHk1rFLBzzC2I",
    "name": "Tríceps no Banco",
    "muscleGroup": "Tríceps",
    "equipment": "Banco",
    "instructions": "Execução de Tríceps no Banco. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XtipRx7YdKSZVEgcFlJYHk1rFLBzzC2I",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XtipRx7YdKSZVEgcFlJYHk1rFLBzzC2I",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XtipRx7YdKSZVEgcFlJYHk1rFLBzzC2I"
  },
  {
    "id": "drive-1S2IWPf6-brUSnh8cbFsutovkhUCupBmL",
    "name": "Tríceps Patada",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Patada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1S2IWPf6-brUSnh8cbFsutovkhUCupBmL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1S2IWPf6-brUSnh8cbFsutovkhUCupBmL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1S2IWPf6-brUSnh8cbFsutovkhUCupBmL"
  },
  {
    "id": "drive-1cifUBt5wcKty37ICT1sN4nXJKM4Lfu-I",
    "name": "Tríceps Polia Baixa Unilateral",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Polia Baixa Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1cifUBt5wcKty37ICT1sN4nXJKM4Lfu-I",
    "thumbnail": "https://lh3.googleusercontent.com/d/1cifUBt5wcKty37ICT1sN4nXJKM4Lfu-I",
    "previewUrl": "https://lh3.googleusercontent.com/d/1cifUBt5wcKty37ICT1sN4nXJKM4Lfu-I"
  },
  {
    "id": "drive-1cKpxHloi2Lk-VlOZRlFGL2i6pwYNXipg",
    "name": "Tríceps Testa com Halteres no Banco Reto",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tríceps Reto Dumbell. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1cKpxHloi2Lk-VlOZRlFGL2i6pwYNXipg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1cKpxHloi2Lk-VlOZRlFGL2i6pwYNXipg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1cKpxHloi2Lk-VlOZRlFGL2i6pwYNXipg"
  },
  {
    "id": "drive-1VQ-CcrDpfpgi_6ov3RdRGqvYkhJj-DUR",
    "name": "Tríceps Reverso Polia Alta",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Reverso Polia Alta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VQ-CcrDpfpgi_6ov3RdRGqvYkhJj-DUR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VQ-CcrDpfpgi_6ov3RdRGqvYkhJj-DUR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VQ-CcrDpfpgi_6ov3RdRGqvYkhJj-DUR"
  },
  {
    "id": "drive-1x4nppgY5PRWkd5iRfPRF_RYqAZ5bRjAG",
    "name": "Tríceps Pulley Pegada Supinada (Reverso)",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Pulley Pegada Supinada (Reverso). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1x4nppgY5PRWkd5iRfPRF_RYqAZ5bRjAG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1x4nppgY5PRWkd5iRfPRF_RYqAZ5bRjAG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1x4nppgY5PRWkd5iRfPRF_RYqAZ5bRjAG"
  },
  {
    "id": "drive-1co52-TtDm83Zz31MWvmvzgSqxK4YhfE-",
    "name": "Tríceps na Polia Média",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps na Polia Média. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1co52-TtDm83Zz31MWvmvzgSqxK4YhfE-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1co52-TtDm83Zz31MWvmvzgSqxK4YhfE-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1co52-TtDm83Zz31MWvmvzgSqxK4YhfE-"
  },
  {
    "id": "drive-1qF8OTlGjMRTz8zLP2fEfV0m924Gzyfgw",
    "name": "Tríceps Testa com Halteres",
    "muscleGroup": "Tríceps",
    "equipment": "Halteres",
    "instructions": "Execução de Tríceps Testa com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qF8OTlGjMRTz8zLP2fEfV0m924Gzyfgw",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qF8OTlGjMRTz8zLP2fEfV0m924Gzyfgw",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qF8OTlGjMRTz8zLP2fEfV0m924Gzyfgw"
  },
  {
    "id": "drive-18s9wD8V8cPLEURqJ_6oJsduXEGRFaH8g",
    "name": "Tríceps Testa Pegada Reversa",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Tríceps Testa Pegada Reversa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18s9wD8V8cPLEURqJ_6oJsduXEGRFaH8g",
    "thumbnail": "https://lh3.googleusercontent.com/d/18s9wD8V8cPLEURqJ_6oJsduXEGRFaH8g",
    "previewUrl": "https://lh3.googleusercontent.com/d/18s9wD8V8cPLEURqJ_6oJsduXEGRFaH8g"
  },
  {
    "id": "drive-1eJFv5BMXkXcjBo0Lva8k6hbYckVNBG4b",
    "name": "Tríceps Testa na Polia",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Testa na Polia. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1eJFv5BMXkXcjBo0Lva8k6hbYckVNBG4b",
    "thumbnail": "https://lh3.googleusercontent.com/d/1eJFv5BMXkXcjBo0Lva8k6hbYckVNBG4b",
    "previewUrl": "https://lh3.googleusercontent.com/d/1eJFv5BMXkXcjBo0Lva8k6hbYckVNBG4b"
  },
  {
    "id": "drive-1ujyzh3Kct7slggE32CjCMrrsiBvHIeUC",
    "name": "Tríceps Unilateral na Polia (Pegada Neutra/Frontal)",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Unilateral na Polia (Pegada Neutra/Frontal). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ujyzh3Kct7slggE32CjCMrrsiBvHIeUC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ujyzh3Kct7slggE32CjCMrrsiBvHIeUC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ujyzh3Kct7slggE32CjCMrrsiBvHIeUC"
  },
  {
    "id": "drive-1YprK00-8rHl9D-BdGX1mQ_6EZ2rD1BYO",
    "name": "Tríceps Unilateral Pegada Invertida na Polia",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Unilateral Pegada Invertida na Polia. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YprK00-8rHl9D-BdGX1mQ_6EZ2rD1BYO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YprK00-8rHl9D-BdGX1mQ_6EZ2rD1BYO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YprK00-8rHl9D-BdGX1mQ_6EZ2rD1BYO"
  },
  {
    "id": "drive-14jg77rgRyknfZGxuOnh3RTF7VStke9Mm",
    "name": "Tríceps Pulley Unilateral",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Pulley Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14jg77rgRyknfZGxuOnh3RTF7VStke9Mm",
    "thumbnail": "https://lh3.googleusercontent.com/d/14jg77rgRyknfZGxuOnh3RTF7VStke9Mm",
    "previewUrl": "https://lh3.googleusercontent.com/d/14jg77rgRyknfZGxuOnh3RTF7VStke9Mm"
  },
  {
    "id": "drive-1Lg0inXJA4Xvl_qn2cY2NusYoZeHWquuP",
    "name": "Tríceps Pulley com Barra V",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Pulley com Barra V. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Lg0inXJA4Xvl_qn2cY2NusYoZeHWquuP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Lg0inXJA4Xvl_qn2cY2NusYoZeHWquuP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Lg0inXJA4Xvl_qn2cY2NusYoZeHWquuP"
  },
  {
    "id": "drive-1LSMKyVhn2gbSyNiApjBCoFc92cmEcjME",
    "name": "Tríceps Francês Unilateral Sentado",
    "muscleGroup": "Tríceps",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Tríceps Francês Unilateral Sentado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LSMKyVhn2gbSyNiApjBCoFc92cmEcjME",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LSMKyVhn2gbSyNiApjBCoFc92cmEcjME",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LSMKyVhn2gbSyNiApjBCoFc92cmEcjME"
  },
  {
    "id": "drive-1G8q41jjORrlf_-l61rrHVsv_eWwodf2P",
    "name": "Tríceps Pulley com Barra V (Variação 2)",
    "muscleGroup": "Tríceps",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Tríceps Pulley com Barra V (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1G8q41jjORrlf_-l61rrHVsv_eWwodf2P",
    "thumbnail": "https://lh3.googleusercontent.com/d/1G8q41jjORrlf_-l61rrHVsv_eWwodf2P",
    "previewUrl": "https://lh3.googleusercontent.com/d/1G8q41jjORrlf_-l61rrHVsv_eWwodf2P"
  },
  {
    "id": "drive-1hdC89XhXqXrOyZ8mVO3R82TBldTBCfhs",
    "name": "Puxada com Elástico (Band Pull-Apart)",
    "muscleGroup": "Trapézio",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Band Pull. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hdC89XhXqXrOyZ8mVO3R82TBldTBCfhs",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hdC89XhXqXrOyZ8mVO3R82TBldTBCfhs",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hdC89XhXqXrOyZ8mVO3R82TBldTBCfhs"
  },
  {
    "id": "drive-1mo11I1xH1FqL4WtIhxV7zC8RCZYV_nJL",
    "name": "Crucifixo Inverso para Posterior na Polia",
    "muscleGroup": "Trapézio",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo Delt Fly. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mo11I1xH1FqL4WtIhxV7zC8RCZYV_nJL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mo11I1xH1FqL4WtIhxV7zC8RCZYV_nJL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mo11I1xH1FqL4WtIhxV7zC8RCZYV_nJL"
  },
  {
    "id": "drive-1SHPmBoh0zwtNFJEcVJGmUpHT7U0QYrLA",
    "name": "Cabo Reverso",
    "muscleGroup": "Trapézio",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Cabo Reverso. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1SHPmBoh0zwtNFJEcVJGmUpHT7U0QYrLA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1SHPmBoh0zwtNFJEcVJGmUpHT7U0QYrLA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1SHPmBoh0zwtNFJEcVJGmUpHT7U0QYrLA"
  },
  {
    "id": "drive-1WitzlE2EHtGL0pGUPpTDmlA5_gAXO0Cg",
    "name": "Corda de Remo",
    "muscleGroup": "Trapézio",
    "equipment": "Corda Naval",
    "instructions": "Execução de Corda de Remo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WitzlE2EHtGL0pGUPpTDmlA5_gAXO0Cg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WitzlE2EHtGL0pGUPpTDmlA5_gAXO0Cg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WitzlE2EHtGL0pGUPpTDmlA5_gAXO0Cg"
  },
  {
    "id": "drive-158KjxdpEjGmsGGQrgT22P642m1QnsG03",
    "name": "Decúbito Inclinado",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Decúbito Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/158KjxdpEjGmsGGQrgT22P642m1QnsG03",
    "thumbnail": "https://lh3.googleusercontent.com/d/158KjxdpEjGmsGGQrgT22P642m1QnsG03",
    "previewUrl": "https://lh3.googleusercontent.com/d/158KjxdpEjGmsGGQrgT22P642m1QnsG03"
  },
  {
    "id": "drive-1MMCW0QtFio6dF3LTGDsB-b13i48Uw5C1",
    "name": "Elevação em Y",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação em Y. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MMCW0QtFio6dF3LTGDsB-b13i48Uw5C1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MMCW0QtFio6dF3LTGDsB-b13i48Uw5C1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MMCW0QtFio6dF3LTGDsB-b13i48Uw5C1"
  },
  {
    "id": "drive-1ZSRVXtfNuv1je0KNYHH9epVveo7-uwBn",
    "name": "Elevação Lateral Inclinada (Variação 2)",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Elevação Lateral Inclinada (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZSRVXtfNuv1je0KNYHH9epVveo7-uwBn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZSRVXtfNuv1je0KNYHH9epVveo7-uwBn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZSRVXtfNuv1je0KNYHH9epVveo7-uwBn"
  },
  {
    "id": "drive-1mPhuGk-RhN9T7pNlbyCEcaylThjgqllo",
    "name": "Encolher com Barra",
    "muscleGroup": "Trapézio",
    "equipment": "Barra",
    "instructions": "Execução de Encolher com Barra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mPhuGk-RhN9T7pNlbyCEcaylThjgqllo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mPhuGk-RhN9T7pNlbyCEcaylThjgqllo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mPhuGk-RhN9T7pNlbyCEcaylThjgqllo"
  },
  {
    "id": "drive-1RSwsOVSeqXXlDwsK8KumSsSgevzoRo-O",
    "name": "Encolhimento Alavanca",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Encolhimento Alavanca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RSwsOVSeqXXlDwsK8KumSsSgevzoRo-O",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RSwsOVSeqXXlDwsK8KumSsSgevzoRo-O",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RSwsOVSeqXXlDwsK8KumSsSgevzoRo-O"
  },
  {
    "id": "drive-1rfDzWY19EL2DeYYE1OyEJWa0Dp17O7Uw",
    "name": "Encolhimento com Halteres",
    "muscleGroup": "Trapézio",
    "equipment": "Halteres",
    "instructions": "Execução de Encolhimento com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rfDzWY19EL2DeYYE1OyEJWa0Dp17O7Uw",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rfDzWY19EL2DeYYE1OyEJWa0Dp17O7Uw",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rfDzWY19EL2DeYYE1OyEJWa0Dp17O7Uw"
  },
  {
    "id": "drive-1jZD7SlI6cZleKbKamu69OXVOK4H4brYZ",
    "name": "Encolhimento de Ombros Pela Frente",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Encolhimento de Ombros Pela Frente. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jZD7SlI6cZleKbKamu69OXVOK4H4brYZ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jZD7SlI6cZleKbKamu69OXVOK4H4brYZ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jZD7SlI6cZleKbKamu69OXVOK4H4brYZ"
  },
  {
    "id": "drive-1TOOpefzzq2VnyWw7mBHEuye8pZeIh1O3",
    "name": "Encolhimento de Ombros Por Trás",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Encolhimento de Ombros Por Trás. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TOOpefzzq2VnyWw7mBHEuye8pZeIh1O3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TOOpefzzq2VnyWw7mBHEuye8pZeIh1O3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TOOpefzzq2VnyWw7mBHEuye8pZeIh1O3"
  },
  {
    "id": "drive-1imPY2HXiObbKIQtoPlrKXUhEq-Qcnw3m",
    "name": "Encolhimento Inclinado",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Encolhimento Inclinado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1imPY2HXiObbKIQtoPlrKXUhEq-Qcnw3m",
    "thumbnail": "https://lh3.googleusercontent.com/d/1imPY2HXiObbKIQtoPlrKXUhEq-Qcnw3m",
    "previewUrl": "https://lh3.googleusercontent.com/d/1imPY2HXiObbKIQtoPlrKXUhEq-Qcnw3m"
  },
  {
    "id": "drive-1ie8JxAU5v9hK57Hsl0hed-msoGT1mGiW",
    "name": "Encolhimento na Polia Baixa",
    "muscleGroup": "Trapézio",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Encolhimento na Polia Baixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ie8JxAU5v9hK57Hsl0hed-msoGT1mGiW",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ie8JxAU5v9hK57Hsl0hed-msoGT1mGiW",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ie8JxAU5v9hK57Hsl0hed-msoGT1mGiW"
  },
  {
    "id": "drive-1DR-lyKTFs1nb3aj2VilKU0rgKepo__j_",
    "name": "Polia Alta",
    "muscleGroup": "Trapézio",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Polia Alta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DR-lyKTFs1nb3aj2VilKU0rgKepo__j_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DR-lyKTFs1nb3aj2VilKU0rgKepo__j_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DR-lyKTFs1nb3aj2VilKU0rgKepo__j_"
  },
  {
    "id": "drive-1y2SyvRfKEqBeA1ZZjupZBwMIoEjIcGHG",
    "name": "Remada Alta na W",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Remada Alta na W. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1y2SyvRfKEqBeA1ZZjupZBwMIoEjIcGHG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1y2SyvRfKEqBeA1ZZjupZBwMIoEjIcGHG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1y2SyvRfKEqBeA1ZZjupZBwMIoEjIcGHG"
  },
  {
    "id": "drive-15SeSItICFcEtCfImDv9PUKtheqgaNvx9",
    "name": "Remada em Pé com Halteres",
    "muscleGroup": "Trapézio",
    "equipment": "Halteres",
    "instructions": "Execução de Remada em Pé com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15SeSItICFcEtCfImDv9PUKtheqgaNvx9",
    "thumbnail": "https://lh3.googleusercontent.com/d/15SeSItICFcEtCfImDv9PUKtheqgaNvx9",
    "previewUrl": "https://lh3.googleusercontent.com/d/15SeSItICFcEtCfImDv9PUKtheqgaNvx9"
  },
  {
    "id": "drive-1Pu3IxoB_nDLrYCr4e1pnZi4q-AilHFfn",
    "name": "Remada Inclinada",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Remada Inclinada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Pu3IxoB_nDLrYCr4e1pnZi4q-AilHFfn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Pu3IxoB_nDLrYCr4e1pnZi4q-AilHFfn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Pu3IxoB_nDLrYCr4e1pnZi4q-AilHFfn"
  },
  {
    "id": "drive-1bFkHD_mt8wfrpd58O-xEsj46__1hRtsG",
    "name": "Remada Vertical",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Remada Vertical. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bFkHD_mt8wfrpd58O-xEsj46__1hRtsG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bFkHD_mt8wfrpd58O-xEsj46__1hRtsG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bFkHD_mt8wfrpd58O-xEsj46__1hRtsG"
  },
  {
    "id": "drive-1-9UhHvQm1sBMoX_h3GxkQsDeLij4T87X",
    "name": "Serratil na Parede com Rolo",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Serratil na Parede com Rolo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-9UhHvQm1sBMoX_h3GxkQsDeLij4T87X",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-9UhHvQm1sBMoX_h3GxkQsDeLij4T87X",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-9UhHvQm1sBMoX_h3GxkQsDeLij4T87X"
  },
  {
    "id": "drive-1Dw5TXS-65TkwTdKhHL8sWopdgZ1SyItr",
    "name": "Voador Inverso",
    "muscleGroup": "Trapézio",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Voador Inverso. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Dw5TXS-65TkwTdKhHL8sWopdgZ1SyItr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Dw5TXS-65TkwTdKhHL8sWopdgZ1SyItr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Dw5TXS-65TkwTdKhHL8sWopdgZ1SyItr"
  },
  {
    "id": "drive-14gJUngyLWLL_7kc_Rzr0UGyV-NLOOa3A",
    "name": "Todo Corpo Exercício 1",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 1. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14gJUngyLWLL_7kc_Rzr0UGyV-NLOOa3A",
    "thumbnail": "https://lh3.googleusercontent.com/d/14gJUngyLWLL_7kc_Rzr0UGyV-NLOOa3A",
    "previewUrl": "https://lh3.googleusercontent.com/d/14gJUngyLWLL_7kc_Rzr0UGyV-NLOOa3A"
  },
  {
    "id": "drive-12u6kLTZXfIQr3pGABSgU7NWehipBK7OP",
    "name": "Todo Corpo Exercício 10",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 10. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12u6kLTZXfIQr3pGABSgU7NWehipBK7OP",
    "thumbnail": "https://lh3.googleusercontent.com/d/12u6kLTZXfIQr3pGABSgU7NWehipBK7OP",
    "previewUrl": "https://lh3.googleusercontent.com/d/12u6kLTZXfIQr3pGABSgU7NWehipBK7OP"
  },
  {
    "id": "drive-1KYua_OtPqeurPoTsxUov2IfofI5LAEMr",
    "name": "Todo Corpo Exercício 11",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 11. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1KYua_OtPqeurPoTsxUov2IfofI5LAEMr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1KYua_OtPqeurPoTsxUov2IfofI5LAEMr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1KYua_OtPqeurPoTsxUov2IfofI5LAEMr"
  },
  {
    "id": "drive-1t3BJRSa4MhVOSeQsB3tyIjcf2-fdSgUe",
    "name": "Todo Corpo Exercício 12",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 12. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1t3BJRSa4MhVOSeQsB3tyIjcf2-fdSgUe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1t3BJRSa4MhVOSeQsB3tyIjcf2-fdSgUe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1t3BJRSa4MhVOSeQsB3tyIjcf2-fdSgUe"
  },
  {
    "id": "drive-1TN2byVPMvPttQ4eLY_X9QHpLxwd80JbY",
    "name": "Todo Corpo Exercício 13",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 13. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TN2byVPMvPttQ4eLY_X9QHpLxwd80JbY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TN2byVPMvPttQ4eLY_X9QHpLxwd80JbY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TN2byVPMvPttQ4eLY_X9QHpLxwd80JbY"
  },
  {
    "id": "drive-1zZYOdh-nsyplFMQL2CO5DdVwBJ_3wZTB",
    "name": "Todo Corpo Exercício 14",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 14. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zZYOdh-nsyplFMQL2CO5DdVwBJ_3wZTB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zZYOdh-nsyplFMQL2CO5DdVwBJ_3wZTB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zZYOdh-nsyplFMQL2CO5DdVwBJ_3wZTB"
  },
  {
    "id": "drive-1mhCxrKq4lTDzypr-_LSZzMOgAJI7LrhN",
    "name": "Todo Corpo Exercício 15",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 15. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mhCxrKq4lTDzypr-_LSZzMOgAJI7LrhN",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mhCxrKq4lTDzypr-_LSZzMOgAJI7LrhN",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mhCxrKq4lTDzypr-_LSZzMOgAJI7LrhN"
  },
  {
    "id": "drive-1hITKJ9Ym4dNUbfdZDZNbmNjG1mAjT3AV",
    "name": "Todo Corpo Exercício 16",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 16. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hITKJ9Ym4dNUbfdZDZNbmNjG1mAjT3AV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hITKJ9Ym4dNUbfdZDZNbmNjG1mAjT3AV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hITKJ9Ym4dNUbfdZDZNbmNjG1mAjT3AV"
  },
  {
    "id": "drive-1N3qB1i1Gs6mOrOC24Wx24xPVRmZ7kbsa",
    "name": "Todo Corpo Exercício 17",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 17. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1N3qB1i1Gs6mOrOC24Wx24xPVRmZ7kbsa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1N3qB1i1Gs6mOrOC24Wx24xPVRmZ7kbsa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1N3qB1i1Gs6mOrOC24Wx24xPVRmZ7kbsa"
  },
  {
    "id": "drive-15PL5wCib6Pe4XAqfFxz1B9nsh-DOnQvD",
    "name": "Todo Corpo Exercício 18",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 18. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15PL5wCib6Pe4XAqfFxz1B9nsh-DOnQvD",
    "thumbnail": "https://lh3.googleusercontent.com/d/15PL5wCib6Pe4XAqfFxz1B9nsh-DOnQvD",
    "previewUrl": "https://lh3.googleusercontent.com/d/15PL5wCib6Pe4XAqfFxz1B9nsh-DOnQvD"
  },
  {
    "id": "drive-1MwZi5NfMRnp0tcyPRPLz1StbiMW0EaFe",
    "name": "Todo Corpo Exercício 19",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 19. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MwZi5NfMRnp0tcyPRPLz1StbiMW0EaFe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MwZi5NfMRnp0tcyPRPLz1StbiMW0EaFe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MwZi5NfMRnp0tcyPRPLz1StbiMW0EaFe"
  },
  {
    "id": "drive-188m8PyPWNxcddFXMv6rS3SiTx0YR4IC9",
    "name": "Todo Corpo Exercício 2",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 2. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/188m8PyPWNxcddFXMv6rS3SiTx0YR4IC9",
    "thumbnail": "https://lh3.googleusercontent.com/d/188m8PyPWNxcddFXMv6rS3SiTx0YR4IC9",
    "previewUrl": "https://lh3.googleusercontent.com/d/188m8PyPWNxcddFXMv6rS3SiTx0YR4IC9"
  },
  {
    "id": "drive-1MHgOw0uzVyKKyAwiZEVa0pyE5697vP6O",
    "name": "Todo Corpo Exercício 20",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 20. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MHgOw0uzVyKKyAwiZEVa0pyE5697vP6O",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MHgOw0uzVyKKyAwiZEVa0pyE5697vP6O",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MHgOw0uzVyKKyAwiZEVa0pyE5697vP6O"
  },
  {
    "id": "drive-1uWKSc0aFN_ucIN0G2vwgsbKJCM94_f2v",
    "name": "Todo Corpo Exercício 21",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 21. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1uWKSc0aFN_ucIN0G2vwgsbKJCM94_f2v",
    "thumbnail": "https://lh3.googleusercontent.com/d/1uWKSc0aFN_ucIN0G2vwgsbKJCM94_f2v",
    "previewUrl": "https://lh3.googleusercontent.com/d/1uWKSc0aFN_ucIN0G2vwgsbKJCM94_f2v"
  },
  {
    "id": "drive-1UoeXXOwOvfQWHFZYdBKtOqvUpgttuBQy",
    "name": "Todo Corpo Exercício 22",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 22. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UoeXXOwOvfQWHFZYdBKtOqvUpgttuBQy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UoeXXOwOvfQWHFZYdBKtOqvUpgttuBQy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UoeXXOwOvfQWHFZYdBKtOqvUpgttuBQy"
  },
  {
    "id": "drive-1Fi0Z8KWHZrI4pSntHUSK55tCVR4u36Wn",
    "name": "Todo Corpo Exercício 23",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 23. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Fi0Z8KWHZrI4pSntHUSK55tCVR4u36Wn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Fi0Z8KWHZrI4pSntHUSK55tCVR4u36Wn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Fi0Z8KWHZrI4pSntHUSK55tCVR4u36Wn"
  },
  {
    "id": "drive-1bnqHk2EjvofpaLTP9t137L7Kea96Tr2S",
    "name": "Todo Corpo Exercício 24",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 24. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bnqHk2EjvofpaLTP9t137L7Kea96Tr2S",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bnqHk2EjvofpaLTP9t137L7Kea96Tr2S",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bnqHk2EjvofpaLTP9t137L7Kea96Tr2S"
  },
  {
    "id": "drive-1SyJcSEC5N7qgE7bAz6yuQVYjJA_P4Sif",
    "name": "Todo Corpo Exercício 25",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 25. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1SyJcSEC5N7qgE7bAz6yuQVYjJA_P4Sif",
    "thumbnail": "https://lh3.googleusercontent.com/d/1SyJcSEC5N7qgE7bAz6yuQVYjJA_P4Sif",
    "previewUrl": "https://lh3.googleusercontent.com/d/1SyJcSEC5N7qgE7bAz6yuQVYjJA_P4Sif"
  },
  {
    "id": "drive-1YiUNBmYYwfrWR0hz1zSnvF2nKCcLP-ew",
    "name": "Todo Corpo Exercício 26",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 26. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YiUNBmYYwfrWR0hz1zSnvF2nKCcLP-ew",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YiUNBmYYwfrWR0hz1zSnvF2nKCcLP-ew",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YiUNBmYYwfrWR0hz1zSnvF2nKCcLP-ew"
  },
  {
    "id": "drive-179vklog8sLm5q23TlBly5bgZQUYh207e",
    "name": "Todo Corpo Exercício 27",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 27. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/179vklog8sLm5q23TlBly5bgZQUYh207e",
    "thumbnail": "https://lh3.googleusercontent.com/d/179vklog8sLm5q23TlBly5bgZQUYh207e",
    "previewUrl": "https://lh3.googleusercontent.com/d/179vklog8sLm5q23TlBly5bgZQUYh207e"
  },
  {
    "id": "drive-1-LghRSvrW774YlycJt2DtSNznpClD2n2",
    "name": "Todo Corpo Exercício 28",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 28. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-LghRSvrW774YlycJt2DtSNznpClD2n2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-LghRSvrW774YlycJt2DtSNznpClD2n2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-LghRSvrW774YlycJt2DtSNznpClD2n2"
  },
  {
    "id": "drive-1JGrUNUd-MNefr1LVvQ_Jv73rlVBpWQhK",
    "name": "Todo Corpo Exercício 29",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 29. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JGrUNUd-MNefr1LVvQ_Jv73rlVBpWQhK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JGrUNUd-MNefr1LVvQ_Jv73rlVBpWQhK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JGrUNUd-MNefr1LVvQ_Jv73rlVBpWQhK"
  },
  {
    "id": "drive-17CRhcfVseU9zqhfREzC9vHbGz46dUgft",
    "name": "Todo Corpo Exercício 3",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 3. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17CRhcfVseU9zqhfREzC9vHbGz46dUgft",
    "thumbnail": "https://lh3.googleusercontent.com/d/17CRhcfVseU9zqhfREzC9vHbGz46dUgft",
    "previewUrl": "https://lh3.googleusercontent.com/d/17CRhcfVseU9zqhfREzC9vHbGz46dUgft"
  },
  {
    "id": "drive-148n2LK9dbuKCYUsHXWOBxlMHrcmcsDtv",
    "name": "Todo Corpo Exercício 30",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 30. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/148n2LK9dbuKCYUsHXWOBxlMHrcmcsDtv",
    "thumbnail": "https://lh3.googleusercontent.com/d/148n2LK9dbuKCYUsHXWOBxlMHrcmcsDtv",
    "previewUrl": "https://lh3.googleusercontent.com/d/148n2LK9dbuKCYUsHXWOBxlMHrcmcsDtv"
  },
  {
    "id": "drive-1mdvOw8LI2ZhwuGAdHxi2JdrUdcrYv2dJ",
    "name": "Todo Corpo Exercício 31",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 31. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mdvOw8LI2ZhwuGAdHxi2JdrUdcrYv2dJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mdvOw8LI2ZhwuGAdHxi2JdrUdcrYv2dJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mdvOw8LI2ZhwuGAdHxi2JdrUdcrYv2dJ"
  },
  {
    "id": "drive-1HeKyTXi7Q9Kx9hnXFPfzTVGocGchgNhN",
    "name": "Todo Corpo Exercício 32",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 32. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HeKyTXi7Q9Kx9hnXFPfzTVGocGchgNhN",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HeKyTXi7Q9Kx9hnXFPfzTVGocGchgNhN",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HeKyTXi7Q9Kx9hnXFPfzTVGocGchgNhN"
  },
  {
    "id": "drive-1kK8Si0G_tcq1G47xItVXvJ-7CtPCtNpo",
    "name": "Todo Corpo Exercício 33",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 33. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kK8Si0G_tcq1G47xItVXvJ-7CtPCtNpo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kK8Si0G_tcq1G47xItVXvJ-7CtPCtNpo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kK8Si0G_tcq1G47xItVXvJ-7CtPCtNpo"
  },
  {
    "id": "drive-1AAzs4ut3qxs70UaaAoU9elCwefxm38VO",
    "name": "Todo Corpo Exercício 34",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 34. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AAzs4ut3qxs70UaaAoU9elCwefxm38VO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AAzs4ut3qxs70UaaAoU9elCwefxm38VO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AAzs4ut3qxs70UaaAoU9elCwefxm38VO"
  },
  {
    "id": "drive-1Glk-SaR7glAdrBrOtzz341ub6lzfKVMJ",
    "name": "Todo Corpo Exercício 35",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 35. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Glk-SaR7glAdrBrOtzz341ub6lzfKVMJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Glk-SaR7glAdrBrOtzz341ub6lzfKVMJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Glk-SaR7glAdrBrOtzz341ub6lzfKVMJ"
  },
  {
    "id": "drive-1M0FAvEOIr0lpHNHOApJoVjs4Rc6wT4JY",
    "name": "Todo Corpo Exercício 36",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 36. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1M0FAvEOIr0lpHNHOApJoVjs4Rc6wT4JY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1M0FAvEOIr0lpHNHOApJoVjs4Rc6wT4JY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1M0FAvEOIr0lpHNHOApJoVjs4Rc6wT4JY"
  },
  {
    "id": "drive-1tAF9dEXJghIJvzfEc4T2C4qYLzlKHaXg",
    "name": "Todo Corpo Exercício 37",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 37. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1tAF9dEXJghIJvzfEc4T2C4qYLzlKHaXg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1tAF9dEXJghIJvzfEc4T2C4qYLzlKHaXg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1tAF9dEXJghIJvzfEc4T2C4qYLzlKHaXg"
  },
  {
    "id": "drive-1BFO5wzVwW2kcJsE81QMs_Mo0ikk0kOE7",
    "name": "Todo Corpo Exercício 38",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 38. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BFO5wzVwW2kcJsE81QMs_Mo0ikk0kOE7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BFO5wzVwW2kcJsE81QMs_Mo0ikk0kOE7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BFO5wzVwW2kcJsE81QMs_Mo0ikk0kOE7"
  },
  {
    "id": "drive-1HYuRWcstIXjWZKUnr5A9VM1BE0mg77-M",
    "name": "Todo Corpo Exercício 39",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 39. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HYuRWcstIXjWZKUnr5A9VM1BE0mg77-M",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HYuRWcstIXjWZKUnr5A9VM1BE0mg77-M",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HYuRWcstIXjWZKUnr5A9VM1BE0mg77-M"
  },
  {
    "id": "drive-1ybCywJWCju2jAGC28VskaBzr6gkLjiSB",
    "name": "Todo Corpo Exercício 4",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 4. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ybCywJWCju2jAGC28VskaBzr6gkLjiSB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ybCywJWCju2jAGC28VskaBzr6gkLjiSB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ybCywJWCju2jAGC28VskaBzr6gkLjiSB"
  },
  {
    "id": "drive-1WZ5oM8wNR0qQqIygVTNpOOMSnJitjOfT",
    "name": "Todo Corpo Exercício 40",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 40. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WZ5oM8wNR0qQqIygVTNpOOMSnJitjOfT",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WZ5oM8wNR0qQqIygVTNpOOMSnJitjOfT",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WZ5oM8wNR0qQqIygVTNpOOMSnJitjOfT"
  },
  {
    "id": "drive-1ldpYIKUe5_bX0NWG1YDTa13-ti8hebz3",
    "name": "Todo Corpo Exercício 41",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 41. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ldpYIKUe5_bX0NWG1YDTa13-ti8hebz3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ldpYIKUe5_bX0NWG1YDTa13-ti8hebz3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ldpYIKUe5_bX0NWG1YDTa13-ti8hebz3"
  },
  {
    "id": "drive-1aF8guD9HQvXoF6gZRXC8q2Ji48Cv-Jvo",
    "name": "Todo Corpo Exercício 42",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 42. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aF8guD9HQvXoF6gZRXC8q2Ji48Cv-Jvo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aF8guD9HQvXoF6gZRXC8q2Ji48Cv-Jvo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aF8guD9HQvXoF6gZRXC8q2Ji48Cv-Jvo"
  },
  {
    "id": "drive-1LRpqmfsbmEe6oH_eibZhij0XRKoDh0-8",
    "name": "Todo Corpo Exercício 43",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 43. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LRpqmfsbmEe6oH_eibZhij0XRKoDh0-8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LRpqmfsbmEe6oH_eibZhij0XRKoDh0-8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LRpqmfsbmEe6oH_eibZhij0XRKoDh0-8"
  },
  {
    "id": "drive-1LXWAGbjcngkHG2I1-lb0mLrAhT0NBMR3",
    "name": "Todo Corpo Exercício 44",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 44. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LXWAGbjcngkHG2I1-lb0mLrAhT0NBMR3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LXWAGbjcngkHG2I1-lb0mLrAhT0NBMR3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LXWAGbjcngkHG2I1-lb0mLrAhT0NBMR3"
  },
  {
    "id": "drive-19x0_D6nV_MkcDDcBZW7N32QzG60bAE7V",
    "name": "Todo Corpo Exercício 45",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 45. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19x0_D6nV_MkcDDcBZW7N32QzG60bAE7V",
    "thumbnail": "https://lh3.googleusercontent.com/d/19x0_D6nV_MkcDDcBZW7N32QzG60bAE7V",
    "previewUrl": "https://lh3.googleusercontent.com/d/19x0_D6nV_MkcDDcBZW7N32QzG60bAE7V"
  },
  {
    "id": "drive-1GB0WsfUEbXlAkERX3gLHAIQVJySP5KCb",
    "name": "Todo Corpo Exercício 46",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 46. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GB0WsfUEbXlAkERX3gLHAIQVJySP5KCb",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GB0WsfUEbXlAkERX3gLHAIQVJySP5KCb",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GB0WsfUEbXlAkERX3gLHAIQVJySP5KCb"
  },
  {
    "id": "drive-18JlAKGGcPuAXnzbFqvAU-hF1nYcn3iAF",
    "name": "Todo Corpo Exercício 47",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 47. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18JlAKGGcPuAXnzbFqvAU-hF1nYcn3iAF",
    "thumbnail": "https://lh3.googleusercontent.com/d/18JlAKGGcPuAXnzbFqvAU-hF1nYcn3iAF",
    "previewUrl": "https://lh3.googleusercontent.com/d/18JlAKGGcPuAXnzbFqvAU-hF1nYcn3iAF"
  },
  {
    "id": "drive-1jijratxz8Wb16qpLPzuZKoBxMR0GmWLk",
    "name": "Todo Corpo Exercício 48",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 48. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jijratxz8Wb16qpLPzuZKoBxMR0GmWLk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jijratxz8Wb16qpLPzuZKoBxMR0GmWLk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jijratxz8Wb16qpLPzuZKoBxMR0GmWLk"
  },
  {
    "id": "drive-13nRRklsmfnWgVXTqtE8g6y3CxPEV57UK",
    "name": "Todo Corpo Exercício 5",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 5. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13nRRklsmfnWgVXTqtE8g6y3CxPEV57UK",
    "thumbnail": "https://lh3.googleusercontent.com/d/13nRRklsmfnWgVXTqtE8g6y3CxPEV57UK",
    "previewUrl": "https://lh3.googleusercontent.com/d/13nRRklsmfnWgVXTqtE8g6y3CxPEV57UK"
  },
  {
    "id": "drive-10HPAh-hchbBmJDZx4Lo37blaPzKJtGSF",
    "name": "Todo Corpo Exercício 6",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 6. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10HPAh-hchbBmJDZx4Lo37blaPzKJtGSF",
    "thumbnail": "https://lh3.googleusercontent.com/d/10HPAh-hchbBmJDZx4Lo37blaPzKJtGSF",
    "previewUrl": "https://lh3.googleusercontent.com/d/10HPAh-hchbBmJDZx4Lo37blaPzKJtGSF"
  },
  {
    "id": "drive-1Z-IzXuW0E6gcQOp_ET3X0HhJ1Z-6Jvj0",
    "name": "Todo Corpo Exercício 7",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 7. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Z-IzXuW0E6gcQOp_ET3X0HhJ1Z-6Jvj0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Z-IzXuW0E6gcQOp_ET3X0HhJ1Z-6Jvj0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Z-IzXuW0E6gcQOp_ET3X0HhJ1Z-6Jvj0"
  },
  {
    "id": "drive-116-44SXafWh-Dko4zQoI_rgqLchu5VAf",
    "name": "Todo Corpo Exercício 8",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 8. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/116-44SXafWh-Dko4zQoI_rgqLchu5VAf",
    "thumbnail": "https://lh3.googleusercontent.com/d/116-44SXafWh-Dko4zQoI_rgqLchu5VAf",
    "previewUrl": "https://lh3.googleusercontent.com/d/116-44SXafWh-Dko4zQoI_rgqLchu5VAf"
  },
  {
    "id": "drive-1FghYl9BbAeTiEpNt830ftzVUzxvZpYij",
    "name": "Todo Corpo Exercício 9",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Todo Corpo Exercício 9. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FghYl9BbAeTiEpNt830ftzVUzxvZpYij",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FghYl9BbAeTiEpNt830ftzVUzxvZpYij",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FghYl9BbAeTiEpNt830ftzVUzxvZpYij"
  },
  {
    "id": "drive-1V7-yn47mm2kq1M2Y4vUn4P-gjMxVjh0n",
    "name": "Flexão na Parada de Mão (Handstand Push-Up)",
    "muscleGroup": "Corpo Todo",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Hundstund Flexão de Braço. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1V7-yn47mm2kq1M2Y4vUn4P-gjMxVjh0n",
    "thumbnail": "https://lh3.googleusercontent.com/d/1V7-yn47mm2kq1M2Y4vUn4P-gjMxVjh0n",
    "previewUrl": "https://lh3.googleusercontent.com/d/1V7-yn47mm2kq1M2Y4vUn4P-gjMxVjh0n"
  },
  {
    "id": "drive-1OMZlvhlQpc07-xgKkCIJlOa5PrsNg_gQ",
    "name": "Alongamento de Rotação",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alongamento de Rotação. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1OMZlvhlQpc07-xgKkCIJlOa5PrsNg_gQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1OMZlvhlQpc07-xgKkCIJlOa5PrsNg_gQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1OMZlvhlQpc07-xgKkCIJlOa5PrsNg_gQ"
  },
  {
    "id": "drive-1z7uRJVcRQqU-I4G9x5MogHTtD3qu9XBy",
    "name": "Alongamento Abdominal",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alongamento Abdominal. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1z7uRJVcRQqU-I4G9x5MogHTtD3qu9XBy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1z7uRJVcRQqU-I4G9x5MogHTtD3qu9XBy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1z7uRJVcRQqU-I4G9x5MogHTtD3qu9XBy"
  },
  {
    "id": "drive-1mAWmQEzuu9PYVAMcDPpCqGaXKwxOFH2u",
    "name": "Alongamento de Extensão de Pescoço",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alongamento de Extensão de Pescoço. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mAWmQEzuu9PYVAMcDPpCqGaXKwxOFH2u",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mAWmQEzuu9PYVAMcDPpCqGaXKwxOFH2u",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mAWmQEzuu9PYVAMcDPpCqGaXKwxOFH2u"
  },
  {
    "id": "drive-19DpQuyeE4q5Qzv9cyCz3WaCY903tlnwo",
    "name": "Alongamento de Pescoço Ajoelhado",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alongamento de Pescoço Ajoelhado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19DpQuyeE4q5Qzv9cyCz3WaCY903tlnwo",
    "thumbnail": "https://lh3.googleusercontent.com/d/19DpQuyeE4q5Qzv9cyCz3WaCY903tlnwo",
    "previewUrl": "https://lh3.googleusercontent.com/d/19DpQuyeE4q5Qzv9cyCz3WaCY903tlnwo"
  },
  {
    "id": "drive-1vxalTFFr80CUXJQVB2GTr8PudPlfX6-h",
    "name": "Alongamento de Pescoço Frontal e Dorsal",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alongamento de Pescoço Frontal e Dorsal. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1vxalTFFr80CUXJQVB2GTr8PudPlfX6-h",
    "thumbnail": "https://lh3.googleusercontent.com/d/1vxalTFFr80CUXJQVB2GTr8PudPlfX6-h",
    "previewUrl": "https://lh3.googleusercontent.com/d/1vxalTFFr80CUXJQVB2GTr8PudPlfX6-h"
  },
  {
    "id": "drive-1zs8T9ygVR_KjPYHg_bTj4Hl8-1SKrf0B",
    "name": "Alongamento Esfinge",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alongamento Esfinge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zs8T9ygVR_KjPYHg_bTj4Hl8-1SKrf0B",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zs8T9ygVR_KjPYHg_bTj4Hl8-1SKrf0B",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zs8T9ygVR_KjPYHg_bTj4Hl8-1SKrf0B"
  },
  {
    "id": "drive-1wrFHaxIDn4M7W38aId-As0SmsTDmAufk",
    "name": "Alongamento Lateral",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alongamento Lateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wrFHaxIDn4M7W38aId-As0SmsTDmAufk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wrFHaxIDn4M7W38aId-As0SmsTDmAufk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wrFHaxIDn4M7W38aId-As0SmsTDmAufk"
  },
  {
    "id": "drive-1DD8ll6w9fYXYyqHEu7GE1pzAPJlXiNfp",
    "name": "Encolimento de Ombros Unilateral",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Encolimento de Ombros Unilateral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DD8ll6w9fYXYyqHEu7GE1pzAPJlXiNfp",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DD8ll6w9fYXYyqHEu7GE1pzAPJlXiNfp",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DD8ll6w9fYXYyqHEu7GE1pzAPJlXiNfp"
  },
  {
    "id": "drive-1K7Pd4sDeTykmiDmmxrqFkqPdPCo6ic13",
    "name": "Extensão Cervical",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Extensão Cervical. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1K7Pd4sDeTykmiDmmxrqFkqPdPCo6ic13",
    "thumbnail": "https://lh3.googleusercontent.com/d/1K7Pd4sDeTykmiDmmxrqFkqPdPCo6ic13",
    "previewUrl": "https://lh3.googleusercontent.com/d/1K7Pd4sDeTykmiDmmxrqFkqPdPCo6ic13"
  },
  {
    "id": "drive-1mLrpZ21DyDDHygC1CDsV3uP9lpGz-hil",
    "name": "Extensão de Pescoço Alavanca",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Extensão de Pescoço Alavanca. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mLrpZ21DyDDHygC1CDsV3uP9lpGz-hil",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mLrpZ21DyDDHygC1CDsV3uP9lpGz-hil",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mLrpZ21DyDDHygC1CDsV3uP9lpGz-hil"
  },
  {
    "id": "drive-1b1NTGcIV4-KD-VA7SeGsprHOrXsjZAbm",
    "name": "Extensão de Pescoço Deitado",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Extensão de Pescoço Deitado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1b1NTGcIV4-KD-VA7SeGsprHOrXsjZAbm",
    "thumbnail": "https://lh3.googleusercontent.com/d/1b1NTGcIV4-KD-VA7SeGsprHOrXsjZAbm",
    "previewUrl": "https://lh3.googleusercontent.com/d/1b1NTGcIV4-KD-VA7SeGsprHOrXsjZAbm"
  },
  {
    "id": "drive-1I-dKqKLtZEUmOJPzO0pfb9JPMLJMwER-",
    "name": "Extensão de Pescoço na Polia",
    "muscleGroup": "Pescoço",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Extensão de Pescoço na Polia. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I-dKqKLtZEUmOJPzO0pfb9JPMLJMwER-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I-dKqKLtZEUmOJPzO0pfb9JPMLJMwER-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I-dKqKLtZEUmOJPzO0pfb9JPMLJMwER-"
  },
  {
    "id": "drive-1eJJcBqHEtOEdgFIOt1UCcnI4MFVPkrwg",
    "name": "Flexão de Pescoço na Polia",
    "muscleGroup": "Pescoço",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Flexão de Pescoço na Polia. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1eJJcBqHEtOEdgFIOt1UCcnI4MFVPkrwg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1eJJcBqHEtOEdgFIOt1UCcnI4MFVPkrwg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1eJJcBqHEtOEdgFIOt1UCcnI4MFVPkrwg"
  },
  {
    "id": "drive-19Ek5-teQ07Mc7ASP5sfW5gfGlIFuCZLa",
    "name": "Flexão e Pescoço Deitado",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Flexão e Pescoço Deitado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19Ek5-teQ07Mc7ASP5sfW5gfGlIFuCZLa",
    "thumbnail": "https://lh3.googleusercontent.com/d/19Ek5-teQ07Mc7ASP5sfW5gfGlIFuCZLa",
    "previewUrl": "https://lh3.googleusercontent.com/d/19Ek5-teQ07Mc7ASP5sfW5gfGlIFuCZLa"
  },
  {
    "id": "drive-1wEtTlEtIiIdtSlX2DYWS7XCApN_86GaU",
    "name": "Hiperextensão no Solo",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Hiperextensão no Solo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wEtTlEtIiIdtSlX2DYWS7XCApN_86GaU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wEtTlEtIiIdtSlX2DYWS7XCApN_86GaU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wEtTlEtIiIdtSlX2DYWS7XCApN_86GaU"
  },
  {
    "id": "drive-14layuXKLqoQ9Og2pRmOlOERSLzTJijjL",
    "name": "Postura do Peixe (Alongamento Cervical/Peito)",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Pose Peixe. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14layuXKLqoQ9Og2pRmOlOERSLzTJijjL",
    "thumbnail": "https://lh3.googleusercontent.com/d/14layuXKLqoQ9Og2pRmOlOERSLzTJijjL",
    "previewUrl": "https://lh3.googleusercontent.com/d/14layuXKLqoQ9Og2pRmOlOERSLzTJijjL"
  },
  {
    "id": "drive-1g39q7wd0Qo3-GWSADEa-iHLhm_LtL5im",
    "name": "Retração Cervical (Chin Tuck)",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Queixo Tuck. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1g39q7wd0Qo3-GWSADEa-iHLhm_LtL5im",
    "thumbnail": "https://lh3.googleusercontent.com/d/1g39q7wd0Qo3-GWSADEa-iHLhm_LtL5im",
    "previewUrl": "https://lh3.googleusercontent.com/d/1g39q7wd0Qo3-GWSADEa-iHLhm_LtL5im"
  },
  {
    "id": "drive-1G1Km6_KMVT07Ry6-Gwc0mdt7L4p368vr",
    "name": "Super Homem",
    "muscleGroup": "Pescoço",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Super Homem. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1G1Km6_KMVT07Ry6-Gwc0mdt7L4p368vr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1G1Km6_KMVT07Ry6-Gwc0mdt7L4p368vr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1G1Km6_KMVT07Ry6-Gwc0mdt7L4p368vr"
  },
  {
    "id": "drive-19TFdaAiBwi1Ri334ZByN1bo9gRYDctjo",
    "name": "O Agachamento Convencional com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de O Agachamento Convencional com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19TFdaAiBwi1Ri334ZByN1bo9gRYDctjo",
    "thumbnail": "https://lh3.googleusercontent.com/d/19TFdaAiBwi1Ri334ZByN1bo9gRYDctjo",
    "previewUrl": "https://lh3.googleusercontent.com/d/19TFdaAiBwi1Ri334ZByN1bo9gRYDctjo"
  },
  {
    "id": "drive-1mG2TGGW4N6yx_cVIaZ0C2qDPjVUueUcu",
    "name": "Agachamento Frontal com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Agachamento Frontal com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mG2TGGW4N6yx_cVIaZ0C2qDPjVUueUcu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mG2TGGW4N6yx_cVIaZ0C2qDPjVUueUcu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mG2TGGW4N6yx_cVIaZ0C2qDPjVUueUcu"
  },
  {
    "id": "drive-146Eny0HdwbKIpjgNY52fa_KlI19qiNCg",
    "name": "Agachamento Sumô com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Agachamento Sumô com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/146Eny0HdwbKIpjgNY52fa_KlI19qiNCg",
    "thumbnail": "https://lh3.googleusercontent.com/d/146Eny0HdwbKIpjgNY52fa_KlI19qiNCg",
    "previewUrl": "https://lh3.googleusercontent.com/d/146Eny0HdwbKIpjgNY52fa_KlI19qiNCg"
  },
  {
    "id": "drive-1N609zsJTU40Kj6asMkGpi9scfdLWEBJf",
    "name": "Agachamento Dividido com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Agachamento Dividido com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1N609zsJTU40Kj6asMkGpi9scfdLWEBJf",
    "thumbnail": "https://lh3.googleusercontent.com/d/1N609zsJTU40Kj6asMkGpi9scfdLWEBJf",
    "previewUrl": "https://lh3.googleusercontent.com/d/1N609zsJTU40Kj6asMkGpi9scfdLWEBJf"
  },
  {
    "id": "drive-1m2MPg670ukbwn4a5TqV8wf-t2KmtuS1_",
    "name": "O Agachamento Cálice",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de O Agachamento Cálice. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1m2MPg670ukbwn4a5TqV8wf-t2KmtuS1_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1m2MPg670ukbwn4a5TqV8wf-t2KmtuS1_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1m2MPg670ukbwn4a5TqV8wf-t2KmtuS1_"
  },
  {
    "id": "drive-1WBEPQu7A1sM6PFvqA4XmKn-hNw8QueSy",
    "name": "O Agachamento Búlgaro com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de O Agachamento Búlgaro com Halteres. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WBEPQu7A1sM6PFvqA4XmKn-hNw8QueSy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WBEPQu7A1sM6PFvqA4XmKn-hNw8QueSy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WBEPQu7A1sM6PFvqA4XmKn-hNw8QueSy"
  },
  {
    "id": "drive-1-U62ocHWha9Phi6IPR3Gw9wmvuCj7I-M",
    "name": "Afundo",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Afundo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-U62ocHWha9Phi6IPR3Gw9wmvuCj7I-M",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-U62ocHWha9Phi6IPR3Gw9wmvuCj7I-M",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-U62ocHWha9Phi6IPR3Gw9wmvuCj7I-M"
  },
  {
    "id": "drive-1CC4-y-HOyixDnPMtHZjmsDIa62fqQ_8t",
    "name": "Agachamento com Cinto",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento com Cinto. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CC4-y-HOyixDnPMtHZjmsDIa62fqQ_8t",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CC4-y-HOyixDnPMtHZjmsDIa62fqQ_8t",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CC4-y-HOyixDnPMtHZjmsDIa62fqQ_8t"
  },
  {
    "id": "drive-1dfabbqMsnPBpt8JkHJXP7TeZfV9UoxyF",
    "name": "Pull Through na Polia/Elástico",
    "muscleGroup": "Pernas",
    "equipment": "Elástico / Band",
    "instructions": "Execução de Band Pull Through. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dfabbqMsnPBpt8JkHJXP7TeZfV9UoxyF",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dfabbqMsnPBpt8JkHJXP7TeZfV9UoxyF",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dfabbqMsnPBpt8JkHJXP7TeZfV9UoxyF"
  },
  {
    "id": "drive-16EBYTqtemfH68kbcfWj68ARQa6284i7g",
    "name": "Clean and Press com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Clean And Press Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/16EBYTqtemfH68kbcfWj68ARQa6284i7g",
    "thumbnail": "https://lh3.googleusercontent.com/d/16EBYTqtemfH68kbcfWj68ARQa6284i7g",
    "previewUrl": "https://lh3.googleusercontent.com/d/16EBYTqtemfH68kbcfWj68ARQa6284i7g"
  },
  {
    "id": "drive-1Exg0hDUfjCYskZNiMAULr1FWFVFOmACF",
    "name": "Levantamento Terra com Barra (Vista Frontal)",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Levantamento Terra Front View. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Exg0hDUfjCYskZNiMAULr1FWFVFOmACF",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Exg0hDUfjCYskZNiMAULr1FWFVFOmACF",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Exg0hDUfjCYskZNiMAULr1FWFVFOmACF"
  },
  {
    "id": "drive-1-7p3mLYp_fMiaYXmFbcV782sUvvhkUdx",
    "name": "Levantamento Terra Pegada Mista",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Levantamento Terra Mixed Grip. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-7p3mLYp_fMiaYXmFbcV782sUvvhkUdx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-7p3mLYp_fMiaYXmFbcV782sUvvhkUdx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-7p3mLYp_fMiaYXmFbcV782sUvvhkUdx"
  },
  {
    "id": "drive-16OgNv74KmQ6-ZI8-joJ9JSx4vKPeocyX",
    "name": "Levantamento Terra Tradicional com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Levantamento Terra Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/16OgNv74KmQ6-ZI8-joJ9JSx4vKPeocyX",
    "thumbnail": "https://lh3.googleusercontent.com/d/16OgNv74KmQ6-ZI8-joJ9JSx4vKPeocyX",
    "previewUrl": "https://lh3.googleusercontent.com/d/16OgNv74KmQ6-ZI8-joJ9JSx4vKPeocyX"
  },
  {
    "id": "drive-1GBGZ3kVN-hQ_lUqxAQRCLVqwCT0350Dl",
    "name": "Barra Full Agachamento",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Full Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GBGZ3kVN-hQ_lUqxAQRCLVqwCT0350Dl",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GBGZ3kVN-hQ_lUqxAQRCLVqwCT0350Dl",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GBGZ3kVN-hQ_lUqxAQRCLVqwCT0350Dl"
  },
  {
    "id": "drive-19QAzHIqDMGi0wYZh5_PjJePKbVsya2uK",
    "name": "Agachamento Hack com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Hack Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/19QAzHIqDMGi0wYZh5_PjJePKbVsya2uK",
    "thumbnail": "https://lh3.googleusercontent.com/d/19QAzHIqDMGi0wYZh5_PjJePKbVsya2uK",
    "previewUrl": "https://lh3.googleusercontent.com/d/19QAzHIqDMGi0wYZh5_PjJePKbVsya2uK"
  },
  {
    "id": "drive-1dCUN5hm6OrZ_dcMN83EzEToohPuA64B4",
    "name": "Levantamento Terra Romeno (RDL) com Barra (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Levantamento Terra Romeno (RDL) com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dCUN5hm6OrZ_dcMN83EzEToohPuA64B4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dCUN5hm6OrZ_dcMN83EzEToohPuA64B4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dCUN5hm6OrZ_dcMN83EzEToohPuA64B4"
  },
  {
    "id": "drive-1u8iF6aZocZQ64WuzZtXhTi5p9bMlsYIN",
    "name": "Levantamento Terra Unilateral com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Single Leg Levantamento Terra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1u8iF6aZocZQ64WuzZtXhTi5p9bMlsYIN",
    "thumbnail": "https://lh3.googleusercontent.com/d/1u8iF6aZocZQ64WuzZtXhTi5p9bMlsYIN",
    "previewUrl": "https://lh3.googleusercontent.com/d/1u8iF6aZocZQ64WuzZtXhTi5p9bMlsYIN"
  },
  {
    "id": "drive-1GeleviIrOErJ3-fnO5h2sbK2OxpYNEti",
    "name": "Agachamento Split com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Barra Split Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1GeleviIrOErJ3-fnO5h2sbK2OxpYNEti",
    "thumbnail": "https://lh3.googleusercontent.com/d/1GeleviIrOErJ3-fnO5h2sbK2OxpYNEti",
    "previewUrl": "https://lh3.googleusercontent.com/d/1GeleviIrOErJ3-fnO5h2sbK2OxpYNEti"
  },
  {
    "id": "drive-1L_cug-EE9Bm9MhYvLb0OxGJ4I7o7LkA0",
    "name": "Agachamento Sumô com Barra (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Agachamento Sumô com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1L_cug-EE9Bm9MhYvLb0OxGJ4I7o7LkA0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1L_cug-EE9Bm9MhYvLb0OxGJ4I7o7LkA0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1L_cug-EE9Bm9MhYvLb0OxGJ4I7o7LkA0"
  },
  {
    "id": "drive-11Bg7VIXhfr8EnCwZrM3Y-gjLFcJuacz-",
    "name": "Belt Agachamento Between Boxes",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Belt Agachamento Between Boxes. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11Bg7VIXhfr8EnCwZrM3Y-gjLFcJuacz-",
    "thumbnail": "https://lh3.googleusercontent.com/d/11Bg7VIXhfr8EnCwZrM3Y-gjLFcJuacz-",
    "previewUrl": "https://lh3.googleusercontent.com/d/11Bg7VIXhfr8EnCwZrM3Y-gjLFcJuacz-"
  },
  {
    "id": "drive-1WJE_0Y_MI5HtRAsX3YCJuiIHxQ7GT6hc",
    "name": "Belt Agachamento",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Belt Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WJE_0Y_MI5HtRAsX3YCJuiIHxQ7GT6hc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WJE_0Y_MI5HtRAsX3YCJuiIHxQ7GT6hc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WJE_0Y_MI5HtRAsX3YCJuiIHxQ7GT6hc"
  },
  {
    "id": "drive-1MKcH70EpgTbEc0A_05vFWKCk5zw1iJXS",
    "name": "Afundo Frontal Peso Corporal",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Bodyweight Forward Lunge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MKcH70EpgTbEc0A_05vFWKCk5zw1iJXS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MKcH70EpgTbEc0A_05vFWKCk5zw1iJXS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MKcH70EpgTbEc0A_05vFWKCk5zw1iJXS"
  },
  {
    "id": "drive-1MYoE7bn60wWMOZOgAiP04gO9obpqqJTv",
    "name": "Agachamento Livre Peso Corporal",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Bodyweight Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MYoE7bn60wWMOZOgAiP04gO9obpqqJTv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MYoE7bn60wWMOZOgAiP04gO9obpqqJTv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MYoE7bn60wWMOZOgAiP04gO9obpqqJTv"
  },
  {
    "id": "drive-1166s7bSWt-Q-73fRX79Rp1zR5kE-VxoC",
    "name": "Passada Caminhando Peso Corporal",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Bodyweight Walking Lunge Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1166s7bSWt-Q-73fRX79Rp1zR5kE-VxoC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1166s7bSWt-Q-73fRX79Rp1zR5kE-VxoC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1166s7bSWt-Q-73fRX79Rp1zR5kE-VxoC"
  },
  {
    "id": "drive-1xjLfCoswIhgnLQUmRc1vNSIxQGJhgP_Y",
    "name": "Agachamento na Caixa (Box Squat)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Box Agachamento Muscles Used. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xjLfCoswIhgnLQUmRc1vNSIxQGJhgP_Y",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xjLfCoswIhgnLQUmRc1vNSIxQGJhgP_Y",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xjLfCoswIhgnLQUmRc1vNSIxQGJhgP_Y"
  },
  {
    "id": "drive-1SQNznElQW8-ov3Hsr9tzI8_hN4K5_h5k",
    "name": "Agachamento Búlgaro (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Búlgaro (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1SQNznElQW8-ov3Hsr9tzI8_hN4K5_h5k",
    "thumbnail": "https://lh3.googleusercontent.com/d/1SQNznElQW8-ov3Hsr9tzI8_hN4K5_h5k",
    "previewUrl": "https://lh3.googleusercontent.com/d/1SQNznElQW8-ov3Hsr9tzI8_hN4K5_h5k"
  },
  {
    "id": "drive-1MERnTWu1koafRGKpYTEH74J0s8yr0qmE",
    "name": "Afundo Cruzado (Curtsy Lunge)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Curtsy Lunge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MERnTWu1koafRGKpYTEH74J0s8yr0qmE",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MERnTWu1koafRGKpYTEH74J0s8yr0qmE",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MERnTWu1koafRGKpYTEH74J0s8yr0qmE"
  },
  {
    "id": "drive-1RZtojuv3iBLrSt-8GXV_GHCpyUW4ZIKw",
    "name": "Levantamento Terra com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Levantamento Terra Back View. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RZtojuv3iBLrSt-8GXV_GHCpyUW4ZIKw",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RZtojuv3iBLrSt-8GXV_GHCpyUW4ZIKw",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RZtojuv3iBLrSt-8GXV_GHCpyUW4ZIKw"
  },
  {
    "id": "drive-1xLn4ZoCj0xZrWANHs6lNqHeJM_2Ji6bd",
    "name": "Levantamento Terra Pegada Neutra com Halteres",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Levantamento Terra Neutral Grip. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xLn4ZoCj0xZrWANHs6lNqHeJM_2Ji6bd",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xLn4ZoCj0xZrWANHs6lNqHeJM_2Ji6bd",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xLn4ZoCj0xZrWANHs6lNqHeJM_2Ji6bd"
  },
  {
    "id": "drive-17Kj3PO36mRPpVn7LewEo0SBDcaZCh5Px",
    "name": "Halter Swings",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Halter Swings. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/17Kj3PO36mRPpVn7LewEo0SBDcaZCh5Px",
    "thumbnail": "https://lh3.googleusercontent.com/d/17Kj3PO36mRPpVn7LewEo0SBDcaZCh5Px",
    "previewUrl": "https://lh3.googleusercontent.com/d/17Kj3PO36mRPpVn7LewEo0SBDcaZCh5Px"
  },
  {
    "id": "drive-1I8m_HMLsQxI9pdtEsFQvBOWZn046swYR",
    "name": "Agachamento Frontal (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Frontal (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1I8m_HMLsQxI9pdtEsFQvBOWZn046swYR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1I8m_HMLsQxI9pdtEsFQvBOWZn046swYR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1I8m_HMLsQxI9pdtEsFQvBOWZn046swYR"
  },
  {
    "id": "drive-1SQtFhdIOu5QrNLOlOdLfDJ0GN1y729Gv",
    "name": "Agachamento Profundo com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Full Agachamento Side View. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1SQtFhdIOu5QrNLOlOdLfDJ0GN1y729Gv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1SQtFhdIOu5QrNLOlOdLfDJ0GN1y729Gv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1SQtFhdIOu5QrNLOlOdLfDJ0GN1y729Gv"
  },
  {
    "id": "drive-1S9JSUyr9AicO9_PyhA9Z_jpEd9hM8oUY",
    "name": "Agachamento Hack Machine (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Agachamento Hack Machine (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1S9JSUyr9AicO9_PyhA9Z_jpEd9hM8oUY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1S9JSUyr9AicO9_PyhA9Z_jpEd9hM8oUY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1S9JSUyr9AicO9_PyhA9Z_jpEd9hM8oUY"
  },
  {
    "id": "drive-13T2q4BpMVh88dP5zvoAgnCeAfQxGb5gK",
    "name": "Levantamento Terra na Barra Hexagonal",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Hex Bar Levantamento Terra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13T2q4BpMVh88dP5zvoAgnCeAfQxGb5gK",
    "thumbnail": "https://lh3.googleusercontent.com/d/13T2q4BpMVh88dP5zvoAgnCeAfQxGb5gK",
    "previewUrl": "https://lh3.googleusercontent.com/d/13T2q4BpMVh88dP5zvoAgnCeAfQxGb5gK"
  },
  {
    "id": "drive-14Z_RDZBo4pj6ENJqAF0l4NH5J9ZgMA52",
    "name": "Swing Unilateral com Kettlebell",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de How To do A Kettlebell Single Arm Swing. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14Z_RDZBo4pj6ENJqAF0l4NH5J9ZgMA52",
    "thumbnail": "https://lh3.googleusercontent.com/d/14Z_RDZBo4pj6ENJqAF0l4NH5J9ZgMA52",
    "previewUrl": "https://lh3.googleusercontent.com/d/14Z_RDZBo4pj6ENJqAF0l4NH5J9ZgMA52"
  },
  {
    "id": "drive-1YACVP3b5vJ7-Mf13cuY3aLfg9Bhz8JLR",
    "name": "Levantamento Terra Sumô com Kettlebell",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Kettlebell Sumo Levantamento Terra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YACVP3b5vJ7-Mf13cuY3aLfg9Bhz8JLR",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YACVP3b5vJ7-Mf13cuY3aLfg9Bhz8JLR",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YACVP3b5vJ7-Mf13cuY3aLfg9Bhz8JLR"
  },
  {
    "id": "drive-1fReXG7ggohXxR9NfEcABkulVL0UFAKQC",
    "name": "Landmine Levantamento Terra",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Landmine Levantamento Terra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fReXG7ggohXxR9NfEcABkulVL0UFAKQC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fReXG7ggohXxR9NfEcABkulVL0UFAKQC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fReXG7ggohXxR9NfEcABkulVL0UFAKQC"
  },
  {
    "id": "drive-1kEhw25MdjcNt22v-aitlDn-yFzEz1L-1",
    "name": "Landmine Agachamento",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Landmine Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kEhw25MdjcNt22v-aitlDn-yFzEz1L-1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kEhw25MdjcNt22v-aitlDn-yFzEz1L-1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kEhw25MdjcNt22v-aitlDn-yFzEz1L-1"
  },
  {
    "id": "drive-1O6s3ucimQFpH404exlxwHgE4--p4t9nX",
    "name": "Alpinista (Mountain Climber) (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alpinista (Mountain Climber) (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1O6s3ucimQFpH404exlxwHgE4--p4t9nX",
    "thumbnail": "https://lh3.googleusercontent.com/d/1O6s3ucimQFpH404exlxwHgE4--p4t9nX",
    "previewUrl": "https://lh3.googleusercontent.com/d/1O6s3ucimQFpH404exlxwHgE4--p4t9nX"
  },
  {
    "id": "drive-1W1TYfPUaDh9MbRDkUC555ilWBCegUMJu",
    "name": "Afundo Pêndulo",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Pendulum Lunge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1W1TYfPUaDh9MbRDkUC555ilWBCegUMJu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1W1TYfPUaDh9MbRDkUC555ilWBCegUMJu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1W1TYfPUaDh9MbRDkUC555ilWBCegUMJu"
  },
  {
    "id": "drive-1hTlCEkwxlV-RFMnjsxTOuNebGyk1n0AC",
    "name": "Pistol Agachamento",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Pistol Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hTlCEkwxlV-RFMnjsxTOuNebGyk1n0AC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hTlCEkwxlV-RFMnjsxTOuNebGyk1n0AC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hTlCEkwxlV-RFMnjsxTOuNebGyk1n0AC"
  },
  {
    "id": "drive-1CRvHfekVboFYrkeh3xwmQFTzTduIIxDI",
    "name": "Agachamento Unilateral (Pistol Squat)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Pistol Agachamento Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1CRvHfekVboFYrkeh3xwmQFTzTduIIxDI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1CRvHfekVboFYrkeh3xwmQFTzTduIIxDI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1CRvHfekVboFYrkeh3xwmQFTzTduIIxDI"
  },
  {
    "id": "drive-14IGHAiARY-EEgZBezhb8E5zbf85FOgT8",
    "name": "Afundo com Salto (Power Lunge)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Power Lunge Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14IGHAiARY-EEgZBezhb8E5zbf85FOgT8",
    "thumbnail": "https://lh3.googleusercontent.com/d/14IGHAiARY-EEgZBezhb8E5zbf85FOgT8",
    "previewUrl": "https://lh3.googleusercontent.com/d/14IGHAiARY-EEgZBezhb8E5zbf85FOgT8"
  },
  {
    "id": "drive-1ZiYWCoNGq56Jn8XLI2So2gbE9NlbTfOA",
    "name": "Push Press com Barra (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Push Press com Barra (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZiYWCoNGq56Jn8XLI2So2gbE9NlbTfOA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZiYWCoNGq56Jn8XLI2So2gbE9NlbTfOA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZiYWCoNGq56Jn8XLI2So2gbE9NlbTfOA"
  },
  {
    "id": "drive-1rBDxO-r9q1aNPGarhh6vIBu_MZGEg1O1",
    "name": "Agachamento Hack Invertido",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Reverse Hack Agachamento. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rBDxO-r9q1aNPGarhh6vIBu_MZGEg1O1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rBDxO-r9q1aNPGarhh6vIBu_MZGEg1O1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rBDxO-r9q1aNPGarhh6vIBu_MZGEg1O1"
  },
  {
    "id": "drive-13E4oo7l9RGIWJG6PAFlwPWcYfoDC0BY-",
    "name": "Afundo Reverso (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Afundo Reverso (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13E4oo7l9RGIWJG6PAFlwPWcYfoDC0BY-",
    "thumbnail": "https://lh3.googleusercontent.com/d/13E4oo7l9RGIWJG6PAFlwPWcYfoDC0BY-",
    "previewUrl": "https://lh3.googleusercontent.com/d/13E4oo7l9RGIWJG6PAFlwPWcYfoDC0BY-"
  },
  {
    "id": "drive-1-j9m6nhAgdOv4q39f_vHQ__4HsgxLxac",
    "name": "Afundo Lateral",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Side Lunge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-j9m6nhAgdOv4q39f_vHQ__4HsgxLxac",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-j9m6nhAgdOv4q39f_vHQ__4HsgxLxac",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-j9m6nhAgdOv4q39f_vHQ__4HsgxLxac"
  },
  {
    "id": "drive-1J6Cid4B_5BS7vbqISI2jVGlPkwjrOtMB",
    "name": "Levantamento Terra no Smith",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Smith Machine Machine Levantamento Terra. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1J6Cid4B_5BS7vbqISI2jVGlPkwjrOtMB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1J6Cid4B_5BS7vbqISI2jVGlPkwjrOtMB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1J6Cid4B_5BS7vbqISI2jVGlPkwjrOtMB"
  },
  {
    "id": "drive-1Uw8hOQGCH0o_oDlAykoK-6beLNHl02bJ",
    "name": "Agachamento Guiado no Smith (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Agachamento Guiado no Smith (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Uw8hOQGCH0o_oDlAykoK-6beLNHl02bJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Uw8hOQGCH0o_oDlAykoK-6beLNHl02bJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Uw8hOQGCH0o_oDlAykoK-6beLNHl02bJ"
  },
  {
    "id": "drive-1-nNcgj0UMUDIIO9F-N4KMRw8JyGRUQLz",
    "name": "Agachamento com Salto",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento Jump. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-nNcgj0UMUDIIO9F-N4KMRw8JyGRUQLz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-nNcgj0UMUDIIO9F-N4KMRw8JyGRUQLz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-nNcgj0UMUDIIO9F-N4KMRw8JyGRUQLz"
  },
  {
    "id": "drive-1_RCsqaqiGL-ERFZ1ql8FwM-Wsdv2QS3n",
    "name": "Stiff no Smith",
    "muscleGroup": "Pernas",
    "equipment": "Máquina Smith",
    "instructions": "Execução de Stiff no Smith. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_RCsqaqiGL-ERFZ1ql8FwM-Wsdv2QS3n",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_RCsqaqiGL-ERFZ1ql8FwM-Wsdv2QS3n",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_RCsqaqiGL-ERFZ1ql8FwM-Wsdv2QS3n"
  },
  {
    "id": "drive-1UjWFbfWFyk1KH5ACW-Gwyt44yylkmq5n",
    "name": "Levantamento Terra Pernas Estendidas (Stiff)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento Terra Pernas Estendidas (Stiff). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UjWFbfWFyk1KH5ACW-Gwyt44yylkmq5n",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UjWFbfWFyk1KH5ACW-Gwyt44yylkmq5n",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UjWFbfWFyk1KH5ACW-Gwyt44yylkmq5n"
  },
  {
    "id": "drive-1PfkZeoaDB3ow7l7_oP47hnnzbek1XBfx",
    "name": "Levantamento Terra Mala Unilateral",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento Terra Mala Unilateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PfkZeoaDB3ow7l7_oP47hnnzbek1XBfx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PfkZeoaDB3ow7l7_oP47hnnzbek1XBfx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PfkZeoaDB3ow7l7_oP47hnnzbek1XBfx"
  },
  {
    "id": "drive-1BfNPFQ92UlhwWXIpWmTyYURatTQTeGjr",
    "name": "Levantamento Terra Sumô (Variação 2)",
    "muscleGroup": "Pernas",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento Terra Sumô (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BfNPFQ92UlhwWXIpWmTyYURatTQTeGjr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BfNPFQ92UlhwWXIpWmTyYURatTQTeGjr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BfNPFQ92UlhwWXIpWmTyYURatTQTeGjr"
  },
  {
    "id": "drive-1D2Pd6fZhGSo6oTDvx0kTROQ5cekN3ZMs",
    "name": "Levantamento Terra Sumô no Smith",
    "muscleGroup": "Pernas",
    "equipment": "Máquina Smith",
    "instructions": "Execução de Levantamento Terra Sumô no Smith. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1D2Pd6fZhGSo6oTDvx0kTROQ5cekN3ZMs",
    "thumbnail": "https://lh3.googleusercontent.com/d/1D2Pd6fZhGSo6oTDvx0kTROQ5cekN3ZMs",
    "previewUrl": "https://lh3.googleusercontent.com/d/1D2Pd6fZhGSo6oTDvx0kTROQ5cekN3ZMs"
  },
  {
    "id": "drive-1Q5T1w61Pn0akd1CelyEGHH8y72B8rFRK",
    "name": "Agachamento Sumô com Haltere (Variação 4)",
    "muscleGroup": "Pernas",
    "equipment": "Halteres",
    "instructions": "Execução de Agachamento Sumô com Haltere (Variação 4). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Q5T1w61Pn0akd1CelyEGHH8y72B8rFRK",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Q5T1w61Pn0akd1CelyEGHH8y72B8rFRK",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Q5T1w61Pn0akd1CelyEGHH8y72B8rFRK"
  },
  {
    "id": "drive-1fx6AhvYDPtMOBoId3TlSSO8EDGVm0BdJ",
    "name": "Empurro de Trenó (Sled Push)",
    "muscleGroup": "Pernas",
    "equipment": "Trenó",
    "instructions": "Execução de Empurro de Trenó (Sled Push). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fx6AhvYDPtMOBoId3TlSSO8EDGVm0BdJ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fx6AhvYDPtMOBoId3TlSSO8EDGVm0BdJ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fx6AhvYDPtMOBoId3TlSSO8EDGVm0BdJ"
  },
  {
    "id": "drive-1ZdXllfDUP4iAd669wUxV4JGEERdAF1bn",
    "name": "Agachamento na Máquina V-Squat",
    "muscleGroup": "Pernas",
    "equipment": "Máquina",
    "instructions": "Execução de Agachamento na Máquina V-Squat. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZdXllfDUP4iAd669wUxV4JGEERdAF1bn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZdXllfDUP4iAd669wUxV4JGEERdAF1bn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZdXllfDUP4iAd669wUxV4JGEERdAF1bn"
  },
  {
    "id": "drive-1jdP1gWpSWxcmrpPwnmnZ2tfFbtRTujNq",
    "name": "Subida no Caixote com Carga",
    "muscleGroup": "Pernas",
    "equipment": "Banco / Step",
    "instructions": "Execução de Subida no Caixote com Carga. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jdP1gWpSWxcmrpPwnmnZ2tfFbtRTujNq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jdP1gWpSWxcmrpPwnmnZ2tfFbtRTujNq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jdP1gWpSWxcmrpPwnmnZ2tfFbtRTujNq"
  },
  {
    "id": "drive-1q6ybevavH4Z41miuyX19BgfiOnAaxU3b",
    "name": "Agachamento Zercher com Barra",
    "muscleGroup": "Pernas",
    "equipment": "Barra",
    "instructions": "Execução de Agachamento Zercher com Barra. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1q6ybevavH4Z41miuyX19BgfiOnAaxU3b",
    "thumbnail": "https://lh3.googleusercontent.com/d/1q6ybevavH4Z41miuyX19BgfiOnAaxU3b",
    "previewUrl": "https://lh3.googleusercontent.com/d/1q6ybevavH4Z41miuyX19BgfiOnAaxU3b"
  },
  {
    "id": "drive-10SMsY5hQs5vEUPxqM3JGx41ViajudI75",
    "name": "Hang Clean com Barra (LPO)",
    "muscleGroup": "Funcional",
    "equipment": "Barra",
    "instructions": "Execução de Barra Hang Clean Weightlifts. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10SMsY5hQs5vEUPxqM3JGx41ViajudI75",
    "thumbnail": "https://lh3.googleusercontent.com/d/10SMsY5hQs5vEUPxqM3JGx41ViajudI75",
    "previewUrl": "https://lh3.googleusercontent.com/d/10SMsY5hQs5vEUPxqM3JGx41ViajudI75"
  },
  {
    "id": "drive-1zryui69f9gG0gzoIQnomBYXXEmnX0lWA",
    "name": "Corda Naval",
    "muscleGroup": "Funcional",
    "equipment": "Corda Naval",
    "instructions": "Execução de Corda Naval. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zryui69f9gG0gzoIQnomBYXXEmnX0lWA",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zryui69f9gG0gzoIQnomBYXXEmnX0lWA",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zryui69f9gG0gzoIQnomBYXXEmnX0lWA"
  },
  {
    "id": "drive-1JnypNWm9aZgYHP0DYz7rsHxyHdU9vpw9",
    "name": "Salto na Caixa",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Salto na Caixa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JnypNWm9aZgYHP0DYz7rsHxyHdU9vpw9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JnypNWm9aZgYHP0DYz7rsHxyHdU9vpw9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JnypNWm9aZgYHP0DYz7rsHxyHdU9vpw9"
  },
  {
    "id": "drive-1zldxghIFvpjvuyXmDVcPEJBmWJ5pPRjF",
    "name": "Boxe / Sombra (Condicionamento)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Boxing Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zldxghIFvpjvuyXmDVcPEJBmWJ5pPRjF",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zldxghIFvpjvuyXmDVcPEJBmWJ5pPRjF",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zldxghIFvpjvuyXmDVcPEJBmWJ5pPRjF"
  },
  {
    "id": "drive-1YC1kwiFt9LJpXcPP4QF-kq_UYszPd5Co",
    "name": "Kettlebell Figura 8",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de How To do A Kettlebell Figure 8. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YC1kwiFt9LJpXcPP4QF-kq_UYszPd5Co",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YC1kwiFt9LJpXcPP4QF-kq_UYszPd5Co",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YC1kwiFt9LJpXcPP4QF-kq_UYszPd5Co"
  },
  {
    "id": "drive-1AUz60TZjSI_4imImFNrLYejeIUpBauVy",
    "name": "Pular Corda Simulado",
    "muscleGroup": "Funcional",
    "equipment": "Corda Naval",
    "instructions": "Execução de Jump Rope Without Rope. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AUz60TZjSI_4imImFNrLYejeIUpBauVy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AUz60TZjSI_4imImFNrLYejeIUpBauVy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AUz60TZjSI_4imImFNrLYejeIUpBauVy"
  },
  {
    "id": "drive-1UOWYS_q-GpFSxtr_qhKe1KbdDHuwiiea",
    "name": "Pular Corda (Variação 2)",
    "muscleGroup": "Funcional",
    "equipment": "Corda Naval",
    "instructions": "Execução de Pular Corda (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UOWYS_q-GpFSxtr_qhKe1KbdDHuwiiea",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UOWYS_q-GpFSxtr_qhKe1KbdDHuwiiea",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UOWYS_q-GpFSxtr_qhKe1KbdDHuwiiea"
  },
  {
    "id": "drive-1YdSuvdI10JLIR1rrpO6pnYZ1DqypbQvI",
    "name": "Polichinelo (Jumping Jack) (Variação 2)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Polichinelo (Jumping Jack) (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1YdSuvdI10JLIR1rrpO6pnYZ1DqypbQvI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1YdSuvdI10JLIR1rrpO6pnYZ1DqypbQvI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1YdSuvdI10JLIR1rrpO6pnYZ1DqypbQvI"
  },
  {
    "id": "drive-1hBrV9KNQhDm2BOjOALeDGnsoctPDmi9u",
    "name": "Travessia na Barra (Monkey Bars)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Monkey Bars. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hBrV9KNQhDm2BOjOALeDGnsoctPDmi9u",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hBrV9KNQhDm2BOjOALeDGnsoctPDmi9u",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hBrV9KNQhDm2BOjOALeDGnsoctPDmi9u"
  },
  {
    "id": "drive-1-8dtnYmbQcgUyf4QlC0Ywogq1FQVQUp1",
    "name": "Alpinista Cruzado (Mountain Climber)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Mountain Climbers (1). Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-8dtnYmbQcgUyf4QlC0Ywogq1FQVQUp1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-8dtnYmbQcgUyf4QlC0Ywogq1FQVQUp1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-8dtnYmbQcgUyf4QlC0Ywogq1FQVQUp1"
  },
  {
    "id": "drive-1K3FVIa7wnRDcW6UShbQsTeaNqLQ7hvHY",
    "name": "Alpinista (Mountain Climber) (Variação 3)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Alpinista (Mountain Climber) (Variação 3). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1K3FVIa7wnRDcW6UShbQsTeaNqLQ7hvHY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1K3FVIa7wnRDcW6UShbQsTeaNqLQ7hvHY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1K3FVIa7wnRDcW6UShbQsTeaNqLQ7hvHY"
  },
  {
    "id": "drive-1IO4Xh5pJaKG6u6zVCWjLfilNWK9sZcvX",
    "name": "Muscle Up na Barra Fixa",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Muscle Ups Movement. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IO4Xh5pJaKG6u6zVCWjLfilNWK9sZcvX",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IO4Xh5pJaKG6u6zVCWjLfilNWK9sZcvX",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IO4Xh5pJaKG6u6zVCWjLfilNWK9sZcvX"
  },
  {
    "id": "drive-11x1oYr1UzcIL3s__pOBapPFA4e7O673R",
    "name": "Subida na Corda",
    "muscleGroup": "Funcional",
    "equipment": "Corda Naval",
    "instructions": "Execução de Rope Climb. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11x1oYr1UzcIL3s__pOBapPFA4e7O673R",
    "thumbnail": "https://lh3.googleusercontent.com/d/11x1oYr1UzcIL3s__pOBapPFA4e7O673R",
    "previewUrl": "https://lh3.googleusercontent.com/d/11x1oYr1UzcIL3s__pOBapPFA4e7O673R"
  },
  {
    "id": "drive-1R0xPfKIk01g8LQrokC9iLTHW1RzVLJ5J",
    "name": "Salto no Caixote",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Salto no Caixote. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1R0xPfKIk01g8LQrokC9iLTHW1RzVLJ5J",
    "thumbnail": "https://lh3.googleusercontent.com/d/1R0xPfKIk01g8LQrokC9iLTHW1RzVLJ5J",
    "previewUrl": "https://lh3.googleusercontent.com/d/1R0xPfKIk01g8LQrokC9iLTHW1RzVLJ5J"
  },
  {
    "id": "drive-1J53rhGnQk6Zq1hL87iliGfIRZvbQz-Qk",
    "name": "Arrasto de Trenó (Sled Drag)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Sled Drag. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1J53rhGnQk6Zq1hL87iliGfIRZvbQz-Qk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1J53rhGnQk6Zq1hL87iliGfIRZvbQz-Qk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1J53rhGnQk6Zq1hL87iliGfIRZvbQz-Qk"
  },
  {
    "id": "drive-1lYOksgzunaO4xHCmhsiHvb2SmZX5dLJ-",
    "name": "Agachamento com Salto (Variação 2)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Agachamento com Salto (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lYOksgzunaO4xHCmhsiHvb2SmZX5dLJ-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lYOksgzunaO4xHCmhsiHvb2SmZX5dLJ-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lYOksgzunaO4xHCmhsiHvb2SmZX5dLJ-"
  },
  {
    "id": "drive-1dAcTZ8huDNsISQUGz8SmhcTJxIy-D0Yk",
    "name": "Virada de Pneu (Tire Flip)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Tire Flip. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dAcTZ8huDNsISQUGz8SmhcTJxIy-D0Yk",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dAcTZ8huDNsISQUGz8SmhcTJxIy-D0Yk",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dAcTZ8huDNsISQUGz8SmhcTJxIy-D0Yk"
  },
  {
    "id": "drive-1uPEyPTEiLB54-prPelzXnINt7gWdMTMe",
    "name": "Empurro de Trenó (Sled Push) (Variação 2)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Empurro de Trenó (Sled Push) (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1uPEyPTEiLB54-prPelzXnINt7gWdMTMe",
    "thumbnail": "https://lh3.googleusercontent.com/d/1uPEyPTEiLB54-prPelzXnINt7gWdMTMe",
    "previewUrl": "https://lh3.googleusercontent.com/d/1uPEyPTEiLB54-prPelzXnINt7gWdMTMe"
  },
  {
    "id": "drive-1qfkurlGwPKpjMssqFAKrzdXZG4e0FCkH",
    "name": "Salto Agrupado (Tuck Jump) (Variação 2)",
    "muscleGroup": "Funcional",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Salto Agrupado (Tuck Jump) (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qfkurlGwPKpjMssqFAKrzdXZG4e0FCkH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qfkurlGwPKpjMssqFAKrzdXZG4e0FCkH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qfkurlGwPKpjMssqFAKrzdXZG4e0FCkH"
  },
  {
    "id": "drive-1iZzWGfDz8roNxAHnJ5oMp5Be8DsN95Mr",
    "name": "Paralelas Assistidas",
    "muscleGroup": "Peito / Tríceps",
    "equipment": "Barras Paralelas",
    "instructions": "Execução de Paralelas Assistidas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iZzWGfDz8roNxAHnJ5oMp5Be8DsN95Mr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iZzWGfDz8roNxAHnJ5oMp5Be8DsN95Mr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iZzWGfDz8roNxAHnJ5oMp5Be8DsN95Mr"
  },
  {
    "id": "drive-1KO58NQkr63RwwHNrFv6ObkxrI3CyJ_h4",
    "name": "Mergulho no Banco (Variação 3)",
    "muscleGroup": "Peito / Tríceps",
    "equipment": "Banco",
    "instructions": "Execução de Mergulho no Banco (Variação 3). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1KO58NQkr63RwwHNrFv6ObkxrI3CyJ_h4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1KO58NQkr63RwwHNrFv6ObkxrI3CyJ_h4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1KO58NQkr63RwwHNrFv6ObkxrI3CyJ_h4"
  },
  {
    "id": "drive-1kk_V0a1VHmMpY8oAHkbaIk6OiX3pkFWL",
    "name": "Mergulho Coreano",
    "muscleGroup": "Peito / Tríceps",
    "equipment": "Barras Paralelas",
    "instructions": "Execução de Mergulho Coreano. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kk_V0a1VHmMpY8oAHkbaIk6OiX3pkFWL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kk_V0a1VHmMpY8oAHkbaIk6OiX3pkFWL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kk_V0a1VHmMpY8oAHkbaIk6OiX3pkFWL"
  },
  {
    "id": "drive-1wX2E5ITzQsMbiOwcV4q9Z5zR5UcdIekS",
    "name": "Paralelas",
    "muscleGroup": "Peito / Tríceps",
    "equipment": "Barras Paralelas",
    "instructions": "Execução de Paralelas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wX2E5ITzQsMbiOwcV4q9Z5zR5UcdIekS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wX2E5ITzQsMbiOwcV4q9Z5zR5UcdIekS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wX2E5ITzQsMbiOwcV4q9Z5zR5UcdIekS"
  },
  {
    "id": "drive-1VBwo7xGcMfRmIDzo5sTQQ0c6y-tLwy0Y",
    "name": "Mergulho Planche (Calistenia)",
    "muscleGroup": "Peito / Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Planche Dip. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VBwo7xGcMfRmIDzo5sTQQ0c6y-tLwy0Y",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VBwo7xGcMfRmIDzo5sTQQ0c6y-tLwy0Y",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VBwo7xGcMfRmIDzo5sTQQ0c6y-tLwy0Y"
  },
  {
    "id": "drive-1lnl_yi7wrSEWAM7x3Tv7wKclgRgWAQWv",
    "name": "Mergulho nas Argolas (Ring Dip)",
    "muscleGroup": "Peito / Tríceps",
    "equipment": "Peso Corporal / Geral",
    "instructions": "Execução de Ring Dip. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lnl_yi7wrSEWAM7x3Tv7wKclgRgWAQWv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lnl_yi7wrSEWAM7x3Tv7wKclgRgWAQWv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lnl_yi7wrSEWAM7x3Tv7wKclgRgWAQWv"
  },
  {
    "id": "drive-1FEhMSZO8T3khyxle40HJ549cEh0gax0N",
    "name": "Mergulho na Barra Reta (Calistenia)",
    "muscleGroup": "Peito / Tríceps",
    "equipment": "Barras Paralelas",
    "instructions": "Execução de Straight Bar Dips Muscles. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1FEhMSZO8T3khyxle40HJ549cEh0gax0N",
    "thumbnail": "https://lh3.googleusercontent.com/d/1FEhMSZO8T3khyxle40HJ549cEh0gax0N",
    "previewUrl": "https://lh3.googleusercontent.com/d/1FEhMSZO8T3khyxle40HJ549cEh0gax0N"
  },
  {
    "id": "drive-11SMDBL44r1visi2XldzoXZ700w665YBG",
    "name": "Abraços nos Joelhos em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Abraços nos Joelhos em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/11SMDBL44r1visi2XldzoXZ700w665YBG",
    "thumbnail": "https://lh3.googleusercontent.com/d/11SMDBL44r1visi2XldzoXZ700w665YBG",
    "previewUrl": "https://lh3.googleusercontent.com/d/11SMDBL44r1visi2XldzoXZ700w665YBG"
  },
  {
    "id": "drive-13msmIsuvgi9drBuUK1dpmLUgseTzL74n",
    "name": "Adução de Pernas (alongamento do Adutor Maior)",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Adução de Pernas (alongamento do Adutor Maior). Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13msmIsuvgi9drBuUK1dpmLUgseTzL74n",
    "thumbnail": "https://lh3.googleusercontent.com/d/13msmIsuvgi9drBuUK1dpmLUgseTzL74n",
    "previewUrl": "https://lh3.googleusercontent.com/d/13msmIsuvgi9drBuUK1dpmLUgseTzL74n"
  },
  {
    "id": "drive-14wJfLBQx732pSIZzSECOUF6joKAKtc0l",
    "name": "Adução Quadril Deitado de Lado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Adução Quadril Deitado de Lado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14wJfLBQx732pSIZzSECOUF6joKAKtc0l",
    "thumbnail": "https://lh3.googleusercontent.com/d/14wJfLBQx732pSIZzSECOUF6joKAKtc0l",
    "previewUrl": "https://lh3.googleusercontent.com/d/14wJfLBQx732pSIZzSECOUF6joKAKtc0l"
  },
  {
    "id": "drive-1BIhQkuJTyNC4sVsIcmtlX6fW2qwB8mE3",
    "name": "Alongamento Abraço com Tapinhas nas Costas",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Abraço com Tapinhas nas Costas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BIhQkuJTyNC4sVsIcmtlX6fW2qwB8mE3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BIhQkuJTyNC4sVsIcmtlX6fW2qwB8mE3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BIhQkuJTyNC4sVsIcmtlX6fW2qwB8mE3"
  },
  {
    "id": "drive-1yCrR0BbzoUlpG2if95_LrkzD8bzQdVk4",
    "name": "Alongamento Adutores com A Perna Estendida Ajoelhado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Adutores com A Perna Estendida Ajoelhado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1yCrR0BbzoUlpG2if95_LrkzD8bzQdVk4",
    "thumbnail": "https://lh3.googleusercontent.com/d/1yCrR0BbzoUlpG2if95_LrkzD8bzQdVk4",
    "previewUrl": "https://lh3.googleusercontent.com/d/1yCrR0BbzoUlpG2if95_LrkzD8bzQdVk4"
  },
  {
    "id": "drive-1_dy7jlOOSwt5CHMkLQgN0OdY8HV6Yd2M",
    "name": "Alongamento Adutores com Pernas Abertas em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Adutores com Pernas Abertas em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_dy7jlOOSwt5CHMkLQgN0OdY8HV6Yd2M",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_dy7jlOOSwt5CHMkLQgN0OdY8HV6Yd2M",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_dy7jlOOSwt5CHMkLQgN0OdY8HV6Yd2M"
  },
  {
    "id": "drive-1piZgqjXbgFMS-b1qtWLCAN3kZTMUqj9N",
    "name": "Alongamento Adutores com Pernas Afastadas em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Adutores com Pernas Afastadas em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1piZgqjXbgFMS-b1qtWLCAN3kZTMUqj9N",
    "thumbnail": "https://lh3.googleusercontent.com/d/1piZgqjXbgFMS-b1qtWLCAN3kZTMUqj9N",
    "previewUrl": "https://lh3.googleusercontent.com/d/1piZgqjXbgFMS-b1qtWLCAN3kZTMUqj9N"
  },
  {
    "id": "drive-1wnsCTUH4lOrVrA5nACX8fltVNrSXmF5f",
    "name": "Alongamento Adutores da Coxa com Rolo de Espuma",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Adutores da Coxa com Rolo de Espuma. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wnsCTUH4lOrVrA5nACX8fltVNrSXmF5f",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wnsCTUH4lOrVrA5nACX8fltVNrSXmF5f",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wnsCTUH4lOrVrA5nACX8fltVNrSXmF5f"
  },
  {
    "id": "drive-1MXscuF-bIZ88u3vfSymZ93WZ8dJlzR1o",
    "name": "Alongamento Adutores em Posição Sentada com Pernas Abertas",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Adutores em Posição Sentada com Pernas Abertas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1MXscuF-bIZ88u3vfSymZ93WZ8dJlzR1o",
    "thumbnail": "https://lh3.googleusercontent.com/d/1MXscuF-bIZ88u3vfSymZ93WZ8dJlzR1o",
    "previewUrl": "https://lh3.googleusercontent.com/d/1MXscuF-bIZ88u3vfSymZ93WZ8dJlzR1o"
  },
  {
    "id": "drive-1UKYvv0VGMj-vDzpbqnRvoy0SuEL71Y0n",
    "name": "Alongamento Adutores Sentado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Adutores Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UKYvv0VGMj-vDzpbqnRvoy0SuEL71Y0n",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UKYvv0VGMj-vDzpbqnRvoy0SuEL71Y0n",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UKYvv0VGMj-vDzpbqnRvoy0SuEL71Y0n"
  },
  {
    "id": "drive-18XYOs5VUqBfLRLmTvg9cU2uAVE5Bg92S",
    "name": "Alongamento Assistido Reverso (peitoral e Ombro)",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Assistido Reverso (peitoral e Ombro). Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18XYOs5VUqBfLRLmTvg9cU2uAVE5Bg92S",
    "thumbnail": "https://lh3.googleusercontent.com/d/18XYOs5VUqBfLRLmTvg9cU2uAVE5Bg92S",
    "previewUrl": "https://lh3.googleusercontent.com/d/18XYOs5VUqBfLRLmTvg9cU2uAVE5Bg92S"
  },
  {
    "id": "drive-18X9EQpgL9B39WAnhIj-4l98Vk153XNyO",
    "name": "Alongamento Borboleta",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Borboleta. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/18X9EQpgL9B39WAnhIj-4l98Vk153XNyO",
    "thumbnail": "https://lh3.googleusercontent.com/d/18X9EQpgL9B39WAnhIj-4l98Vk153XNyO",
    "previewUrl": "https://lh3.googleusercontent.com/d/18X9EQpgL9B39WAnhIj-4l98Vk153XNyO"
  },
  {
    "id": "drive-1X9n_7Q09UHFvZsCpZNBo-ynDSbIzCVxg",
    "name": "Alongamento com Bastão PVC (Front Rack)",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento com Pvc na Posição Frontal de Rack. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1X9n_7Q09UHFvZsCpZNBo-ynDSbIzCVxg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1X9n_7Q09UHFvZsCpZNBo-ynDSbIzCVxg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1X9n_7Q09UHFvZsCpZNBo-ynDSbIzCVxg"
  },
  {
    "id": "drive-1HFQZ0CxhnVS7uwLJsArFbyyqRK-L0b2N",
    "name": "Alongamento Costas com Rolo de Espuma",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Costas com Rolo de Espuma. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1HFQZ0CxhnVS7uwLJsArFbyyqRK-L0b2N",
    "thumbnail": "https://lh3.googleusercontent.com/d/1HFQZ0CxhnVS7uwLJsArFbyyqRK-L0b2N",
    "previewUrl": "https://lh3.googleusercontent.com/d/1HFQZ0CxhnVS7uwLJsArFbyyqRK-L0b2N"
  },
  {
    "id": "drive-1OKTl96eNKD3BRQpkydQVEWOdZ6GE8XtO",
    "name": "Alongamento Círculos nos Punhos",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Círculos nos Punhos. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1OKTl96eNKD3BRQpkydQVEWOdZ6GE8XtO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1OKTl96eNKD3BRQpkydQVEWOdZ6GE8XtO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1OKTl96eNKD3BRQpkydQVEWOdZ6GE8XtO"
  },
  {
    "id": "drive-1jhsMI7wQ6JdlIrYpzTWG4-JXZbzAc_yw",
    "name": "Alongamento da Esfinge",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento da Esfinge. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jhsMI7wQ6JdlIrYpzTWG4-JXZbzAc_yw",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jhsMI7wQ6JdlIrYpzTWG4-JXZbzAc_yw",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jhsMI7wQ6JdlIrYpzTWG4-JXZbzAc_yw"
  },
  {
    "id": "drive-1ASnPlZ5SzhPWAyw2KkAarSxyLK5X-uOo",
    "name": "Alongamento de Quadril",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento de Quadril. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ASnPlZ5SzhPWAyw2KkAarSxyLK5X-uOo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ASnPlZ5SzhPWAyw2KkAarSxyLK5X-uOo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ASnPlZ5SzhPWAyw2KkAarSxyLK5X-uOo"
  },
  {
    "id": "drive-1BNDSFgCRMhLYaXJiFICrTtwrWrm6xa2t",
    "name": "Alongamento de Rotação da Coluna em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento de Rotação da Coluna em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BNDSFgCRMhLYaXJiFICrTtwrWrm6xa2t",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BNDSFgCRMhLYaXJiFICrTtwrWrm6xa2t",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BNDSFgCRMhLYaXJiFICrTtwrWrm6xa2t"
  },
  {
    "id": "drive-1fRYVJtHh3O2_Lgh0Eul1ZqQNYYIwGZjz",
    "name": "Alongamento Desviador Ulnar e Extensor do Punho",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Desviador Ulnar e Extensor do Punho. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fRYVJtHh3O2_Lgh0Eul1ZqQNYYIwGZjz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fRYVJtHh3O2_Lgh0Eul1ZqQNYYIwGZjz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fRYVJtHh3O2_Lgh0Eul1ZqQNYYIwGZjz"
  },
  {
    "id": "drive-1hT_IKJtCqKEKyEB1zX8IaD0PUcpGBk__",
    "name": "Alongamento Dinâmico do Peitoral",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Dinâmico do Peitoral. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hT_IKJtCqKEKyEB1zX8IaD0PUcpGBk__",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hT_IKJtCqKEKyEB1zX8IaD0PUcpGBk__",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hT_IKJtCqKEKyEB1zX8IaD0PUcpGBk__"
  },
  {
    "id": "drive-1TKj4fcf60FrvrDTNnYw8Fd2BVQiPj4UI",
    "name": "Alongamento do Piriforme Sentado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento do Piriforme Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TKj4fcf60FrvrDTNnYw8Fd2BVQiPj4UI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TKj4fcf60FrvrDTNnYw8Fd2BVQiPj4UI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TKj4fcf60FrvrDTNnYw8Fd2BVQiPj4UI"
  },
  {
    "id": "drive-1WlwQVpE53-v5sQ8qoPW1ohEzflLNDZPg",
    "name": "Alongamento dos Latíssimos Dorsais com Rolo de Espuma",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento dos Latíssimos Dorsais com Rolo de Espuma. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WlwQVpE53-v5sQ8qoPW1ohEzflLNDZPg",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WlwQVpE53-v5sQ8qoPW1ohEzflLNDZPg",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WlwQVpE53-v5sQ8qoPW1ohEzflLNDZPg"
  },
  {
    "id": "drive-1VLnvpLoS2980xh_e8_7kV7oZJt-KVQFM",
    "name": "Alongamento em Pé Quadríceps",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento em Pé Quadríceps. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1VLnvpLoS2980xh_e8_7kV7oZJt-KVQFM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1VLnvpLoS2980xh_e8_7kV7oZJt-KVQFM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1VLnvpLoS2980xh_e8_7kV7oZJt-KVQFM"
  },
  {
    "id": "drive-1IKQ8g6c5JFk1H8L_eSZXMZnmZPk0v1Ok",
    "name": "Alongamento Extensores dos Dedos dos Pés",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Extensores dos Dedos dos Pés. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1IKQ8g6c5JFk1H8L_eSZXMZnmZPk0v1Ok",
    "thumbnail": "https://lh3.googleusercontent.com/d/1IKQ8g6c5JFk1H8L_eSZXMZnmZPk0v1Ok",
    "previewUrl": "https://lh3.googleusercontent.com/d/1IKQ8g6c5JFk1H8L_eSZXMZnmZPk0v1Ok"
  },
  {
    "id": "drive-1d2O3uzD02_cFLbM4rY7qB5iZ5cq4txAY",
    "name": "Alongamento Flexores de Quadril Ajoelhado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Flexores de Quadril Ajoelhado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1d2O3uzD02_cFLbM4rY7qB5iZ5cq4txAY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1d2O3uzD02_cFLbM4rY7qB5iZ5cq4txAY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1d2O3uzD02_cFLbM4rY7qB5iZ5cq4txAY"
  },
  {
    "id": "drive-1gJpg3AJmQR8r_6fGGOylZvHKIM4Ak1ge",
    "name": "Alongamento Flexores do Quadril em Posição de Joelho",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Flexores do Quadril em Posição de Joelho. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gJpg3AJmQR8r_6fGGOylZvHKIM4Ak1ge",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gJpg3AJmQR8r_6fGGOylZvHKIM4Ak1ge",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gJpg3AJmQR8r_6fGGOylZvHKIM4Ak1ge"
  },
  {
    "id": "drive-1-TUE5N9dUfj6aseclx89hUIpo8qSnYy3",
    "name": "Alongamento Flexores dos Dedos dos Pés em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Flexores dos Dedos dos Pés em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-TUE5N9dUfj6aseclx89hUIpo8qSnYy3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-TUE5N9dUfj6aseclx89hUIpo8qSnYy3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-TUE5N9dUfj6aseclx89hUIpo8qSnYy3"
  },
  {
    "id": "drive-1xE3LSa6QjZ1v9pFNAwDqAPFMnWjfbPD0",
    "name": "Alongamento Gastrocnêmio com Joelho Flexionado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Gastrocnêmio com Joelho Flexionado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xE3LSa6QjZ1v9pFNAwDqAPFMnWjfbPD0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xE3LSa6QjZ1v9pFNAwDqAPFMnWjfbPD0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xE3LSa6QjZ1v9pFNAwDqAPFMnWjfbPD0"
  },
  {
    "id": "drive-1kig7wYolLuFwPsZlwS_uNcFwDnEc9SOD",
    "name": "Alongamento Glúteos Deitado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Glúteos Deitado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kig7wYolLuFwPsZlwS_uNcFwDnEc9SOD",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kig7wYolLuFwPsZlwS_uNcFwDnEc9SOD",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kig7wYolLuFwPsZlwS_uNcFwDnEc9SOD"
  },
  {
    "id": "drive-1-m-R0fEtbkjwEbHigEzOR-X_nrXl2woy",
    "name": "Alongamento Inclinado Lateral em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Inclinado Lateral em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-m-R0fEtbkjwEbHigEzOR-X_nrXl2woy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-m-R0fEtbkjwEbHigEzOR-X_nrXl2woy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-m-R0fEtbkjwEbHigEzOR-X_nrXl2woy"
  },
  {
    "id": "drive-1dH5MG3Gk4Nxshkdu8mpNyMnIN3vd2CLU",
    "name": "Alongamento Isquiotibiais Deitado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Isquiotibiais Deitado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dH5MG3Gk4Nxshkdu8mpNyMnIN3vd2CLU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dH5MG3Gk4Nxshkdu8mpNyMnIN3vd2CLU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dH5MG3Gk4Nxshkdu8mpNyMnIN3vd2CLU"
  },
  {
    "id": "drive-1avFbSs0VfrTwlQNRM_z_ifl0hiNXynSO",
    "name": "Alongamento Isquiotibiais em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Isquiotibiais em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1avFbSs0VfrTwlQNRM_z_ifl0hiNXynSO",
    "thumbnail": "https://lh3.googleusercontent.com/d/1avFbSs0VfrTwlQNRM_z_ifl0hiNXynSO",
    "previewUrl": "https://lh3.googleusercontent.com/d/1avFbSs0VfrTwlQNRM_z_ifl0hiNXynSO"
  },
  {
    "id": "drive-1AUwunwkmf6FqIoSbDcdoOnp9zcXFfpB7",
    "name": "Alongamento Isquiotibiais em Pé (Variação 2)",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Isquiotibiais em Pé (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AUwunwkmf6FqIoSbDcdoOnp9zcXFfpB7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AUwunwkmf6FqIoSbDcdoOnp9zcXFfpB7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AUwunwkmf6FqIoSbDcdoOnp9zcXFfpB7"
  },
  {
    "id": "drive-1k3ED_uBWZD7Vx6glgHiOxwfgQ8pVicR9",
    "name": "Alongamento Isquiotibiais em Pé com A Perna Cruzada",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Isquiotibiais em Pé com A Perna Cruzada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1k3ED_uBWZD7Vx6glgHiOxwfgQ8pVicR9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1k3ED_uBWZD7Vx6glgHiOxwfgQ8pVicR9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1k3ED_uBWZD7Vx6glgHiOxwfgQ8pVicR9"
  },
  {
    "id": "drive-15ymHfYQ7jSwXvlJEaq1rzo0C9IFstJSn",
    "name": "Alongamento Isquiotibiais Sentado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Isquiotibiais Sentado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/15ymHfYQ7jSwXvlJEaq1rzo0C9IFstJSn",
    "thumbnail": "https://lh3.googleusercontent.com/d/15ymHfYQ7jSwXvlJEaq1rzo0C9IFstJSn",
    "previewUrl": "https://lh3.googleusercontent.com/d/15ymHfYQ7jSwXvlJEaq1rzo0C9IFstJSn"
  },
  {
    "id": "drive-14Zcn1VfbVwdoL1TWet4Fgf67dvb-ZwA9",
    "name": "Alongamento Lateral Parte Interna da Coxa",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Lateral Parte Interna da Coxa. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14Zcn1VfbVwdoL1TWet4Fgf67dvb-ZwA9",
    "thumbnail": "https://lh3.googleusercontent.com/d/14Zcn1VfbVwdoL1TWet4Fgf67dvb-ZwA9",
    "previewUrl": "https://lh3.googleusercontent.com/d/14Zcn1VfbVwdoL1TWet4Fgf67dvb-ZwA9"
  },
  {
    "id": "drive-1ImoG7Tdt3KA_xY_PwxjQeXQPwRK3vwAq",
    "name": "Alongamento Manguito Rotador",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Manguito Rotador. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ImoG7Tdt3KA_xY_PwxjQeXQPwRK3vwAq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ImoG7Tdt3KA_xY_PwxjQeXQPwRK3vwAq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ImoG7Tdt3KA_xY_PwxjQeXQPwRK3vwAq"
  },
  {
    "id": "drive-1lhlzhauwbES4PgegcZ1Zcx6zOwpfRVpU",
    "name": "Alongamento Ombro Braço Cruzado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Ombro Braço Cruzado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lhlzhauwbES4PgegcZ1Zcx6zOwpfRVpU",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lhlzhauwbES4PgegcZ1Zcx6zOwpfRVpU",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lhlzhauwbES4PgegcZ1Zcx6zOwpfRVpU"
  },
  {
    "id": "drive-1WMeWvqCMXaOLGsrjeCX6boAYX1ZfEwAx",
    "name": "Alongamento Ombro com Toalha",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Ombro com Toalha. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WMeWvqCMXaOLGsrjeCX6boAYX1ZfEwAx",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WMeWvqCMXaOLGsrjeCX6boAYX1ZfEwAx",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WMeWvqCMXaOLGsrjeCX6boAYX1ZfEwAx"
  },
  {
    "id": "drive-1zFLitQ-wS_dGyvDypxtZimwrMc-qa1fa",
    "name": "Alongamento Ombro Reverso em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Ombro Reverso em Pé. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zFLitQ-wS_dGyvDypxtZimwrMc-qa1fa",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zFLitQ-wS_dGyvDypxtZimwrMc-qa1fa",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zFLitQ-wS_dGyvDypxtZimwrMc-qa1fa"
  },
  {
    "id": "drive-1RQJEKj4W3AL1Yax_KKn5HY1iklkcerW2",
    "name": "Alongamento Ombros Por Trás das Costas",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Ombros Por Trás das Costas. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RQJEKj4W3AL1Yax_KKn5HY1iklkcerW2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RQJEKj4W3AL1Yax_KKn5HY1iklkcerW2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RQJEKj4W3AL1Yax_KKn5HY1iklkcerW2"
  },
  {
    "id": "drive-1zkewxGjM3a_90wxfnz2MC61CocPQUSRv",
    "name": "Alongamento Panturrilha Agachado",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Panturrilha Agachado. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zkewxGjM3a_90wxfnz2MC61CocPQUSRv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zkewxGjM3a_90wxfnz2MC61CocPQUSRv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zkewxGjM3a_90wxfnz2MC61CocPQUSRv"
  },
  {
    "id": "drive-1gqbSSxyl66ljJdiJYJ7VbOfWBLsV6qmP",
    "name": "Alongamento Panturrilha com Corda",
    "muscleGroup": "Alongamento",
    "equipment": "Corda Naval",
    "instructions": "Execução de Alongamento Panturrilha com Corda. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gqbSSxyl66ljJdiJYJ7VbOfWBLsV6qmP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gqbSSxyl66ljJdiJYJ7VbOfWBLsV6qmP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gqbSSxyl66ljJdiJYJ7VbOfWBLsV6qmP"
  },
  {
    "id": "drive-1iI-VzzW17NdnQBnq5b13ILzZap2DZ_jL",
    "name": "Alongamento Panturrilha com Descida do Calcanhar",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Panturrilha com Descida do Calcanhar. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iI-VzzW17NdnQBnq5b13ILzZap2DZ_jL",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iI-VzzW17NdnQBnq5b13ILzZap2DZ_jL",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iI-VzzW17NdnQBnq5b13ILzZap2DZ_jL"
  },
  {
    "id": "drive-1NYmquFqExsZuB2DK0T19ajZerE53Muvv",
    "name": "Alongamento Panturrilha com Uma Perna",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Panturrilha com Uma Perna. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NYmquFqExsZuB2DK0T19ajZerE53Muvv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NYmquFqExsZuB2DK0T19ajZerE53Muvv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NYmquFqExsZuB2DK0T19ajZerE53Muvv"
  },
  {
    "id": "drive-1gR4KBnvUqlBvX2PLFiqPQ3EXTK_SZ0xE",
    "name": "Alongamento Panturrilha com Uma Perna Esticada",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Panturrilha com Uma Perna Esticada. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1gR4KBnvUqlBvX2PLFiqPQ3EXTK_SZ0xE",
    "thumbnail": "https://lh3.googleusercontent.com/d/1gR4KBnvUqlBvX2PLFiqPQ3EXTK_SZ0xE",
    "previewUrl": "https://lh3.googleusercontent.com/d/1gR4KBnvUqlBvX2PLFiqPQ3EXTK_SZ0xE"
  },
  {
    "id": "drive-1zPJIygTdA-B0Hc5agTpfJkKdbnbHWw0y",
    "name": "Alongamento Panturrilha em Passo Largo",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Panturrilha em Passo Largo. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1zPJIygTdA-B0Hc5agTpfJkKdbnbHWw0y",
    "thumbnail": "https://lh3.googleusercontent.com/d/1zPJIygTdA-B0Hc5agTpfJkKdbnbHWw0y",
    "previewUrl": "https://lh3.googleusercontent.com/d/1zPJIygTdA-B0Hc5agTpfJkKdbnbHWw0y"
  },
  {
    "id": "drive-1uvofpL3OZWFMbpLPhf_gWSoR3oF33muC",
    "name": "Alongamento Panturrilha em Posição Estática",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Panturrilha em Posição Estática. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1uvofpL3OZWFMbpLPhf_gWSoR3oF33muC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1uvofpL3OZWFMbpLPhf_gWSoR3oF33muC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1uvofpL3OZWFMbpLPhf_gWSoR3oF33muC"
  },
  {
    "id": "drive-1mn1TLj6jkrVlD08z0jD2dEXMqeh-Q5co",
    "name": "Alongamento Panturrilha na Parede",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Panturrilha na Parede. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mn1TLj6jkrVlD08z0jD2dEXMqeh-Q5co",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mn1TLj6jkrVlD08z0jD2dEXMqeh-Q5co",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mn1TLj6jkrVlD08z0jD2dEXMqeh-Q5co"
  },
  {
    "id": "drive-1-9RVbv3vptTeO3YiFI_jOGs1IUolv5pD",
    "name": "Alongamento Parede do Canto",
    "muscleGroup": "Alongamento",
    "equipment": "Solo / Peso Corporal",
    "instructions": "Execução de Alongamento Parede do Canto. Mantenha a postura adequada, contraia o abdômen e controle as fases excêntrica e concêntrica do movimento durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-9RVbv3vptTeO3YiFI_jOGs1IUolv5pD",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-9RVbv3vptTeO3YiFI_jOGs1IUolv5pD",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-9RVbv3vptTeO3YiFI_jOGs1IUolv5pD"
  },
  {
    "id": "drive-1ipU0FoTC-LSOd1HgAilMo89ETSTSZYrS",
    "name": "Alongamento Parte Superior das Costas",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Parte Superior das Costas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ipU0FoTC-LSOd1HgAilMo89ETSTSZYrS",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ipU0FoTC-LSOd1HgAilMo89ETSTSZYrS",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ipU0FoTC-LSOd1HgAilMo89ETSTSZYrS"
  },
  {
    "id": "drive-1--dr9-acsFg0s85AsY-xHQ-X8JcWb0Rn",
    "name": "Alongamento Peito Acima da Cabeça",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Peito Acima da Cabeça. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1--dr9-acsFg0s85AsY-xHQ-X8JcWb0Rn",
    "thumbnail": "https://lh3.googleusercontent.com/d/1--dr9-acsFg0s85AsY-xHQ-X8JcWb0Rn",
    "previewUrl": "https://lh3.googleusercontent.com/d/1--dr9-acsFg0s85AsY-xHQ-X8JcWb0Rn"
  },
  {
    "id": "drive-13Mn3Cw9gdVXuA_f8B4iglqtpWC7MfdDM",
    "name": "Alongamento Peito com Rolo de Espuma",
    "muscleGroup": "Alongamento",
    "equipment": "Rolo de Espuma",
    "instructions": "Execução de Alongamento Peito com Rolo de Espuma. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/13Mn3Cw9gdVXuA_f8B4iglqtpWC7MfdDM",
    "thumbnail": "https://lh3.googleusercontent.com/d/13Mn3Cw9gdVXuA_f8B4iglqtpWC7MfdDM",
    "previewUrl": "https://lh3.googleusercontent.com/d/13Mn3Cw9gdVXuA_f8B4iglqtpWC7MfdDM"
  },
  {
    "id": "drive-1PZE4d1WFkBGIZysi8m6yh698rAtjeGHr",
    "name": "Alongamento Peito e Parte Frontal dos Ombros",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Peito e Parte Frontal dos Ombros. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PZE4d1WFkBGIZysi8m6yh698rAtjeGHr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PZE4d1WFkBGIZysi8m6yh698rAtjeGHr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PZE4d1WFkBGIZysi8m6yh698rAtjeGHr"
  },
  {
    "id": "drive-1e07GQS9CBdtiN0z0os6zVSIT86i_GQGB",
    "name": "Alongamento Peitoral Até As Costas",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Peitoral Até As Costas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1e07GQS9CBdtiN0z0os6zVSIT86i_GQGB",
    "thumbnail": "https://lh3.googleusercontent.com/d/1e07GQS9CBdtiN0z0os6zVSIT86i_GQGB",
    "previewUrl": "https://lh3.googleusercontent.com/d/1e07GQS9CBdtiN0z0os6zVSIT86i_GQGB"
  },
  {
    "id": "drive-1lP39wasteG-SoiRTz3rv_hd4IUQj4Fhj",
    "name": "Alongamento Peitoral com Um Braço em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Peitoral com Um Braço em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lP39wasteG-SoiRTz3rv_hd4IUQj4Fhj",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lP39wasteG-SoiRTz3rv_hd4IUQj4Fhj",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lP39wasteG-SoiRTz3rv_hd4IUQj4Fhj"
  },
  {
    "id": "drive-1LPMW8Lc6DJWlpEDT8Lesj0Srf2ApRzbP",
    "name": "Alongamento Peitoral e do Ombro na Porta",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Peitoral e do Ombro na Porta. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1LPMW8Lc6DJWlpEDT8Lesj0Srf2ApRzbP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1LPMW8Lc6DJWlpEDT8Lesj0Srf2ApRzbP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1LPMW8Lc6DJWlpEDT8Lesj0Srf2ApRzbP"
  },
  {
    "id": "drive-1ztytBCBlTxH5NLnsTg56cck2dGsZ7FX9",
    "name": "Alongamento Peitoral Reverso",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Peitoral Reverso. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ztytBCBlTxH5NLnsTg56cck2dGsZ7FX9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ztytBCBlTxH5NLnsTg56cck2dGsZ7FX9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ztytBCBlTxH5NLnsTg56cck2dGsZ7FX9"
  },
  {
    "id": "drive-1ze_18sc3k84SoP-nRDtleWiKR9tanFCP",
    "name": "Alongamento Pernas Duplo",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Pernas Duplo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ze_18sc3k84SoP-nRDtleWiKR9tanFCP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ze_18sc3k84SoP-nRDtleWiKR9tanFCP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ze_18sc3k84SoP-nRDtleWiKR9tanFCP"
  },
  {
    "id": "drive-10RUNYzPgmYd0fEXHKxDXRATt6cg_JFEa",
    "name": "Alongamento Piriforme",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Piriforme. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/10RUNYzPgmYd0fEXHKxDXRATt6cg_JFEa",
    "thumbnail": "https://lh3.googleusercontent.com/d/10RUNYzPgmYd0fEXHKxDXRATt6cg_JFEa",
    "previewUrl": "https://lh3.googleusercontent.com/d/10RUNYzPgmYd0fEXHKxDXRATt6cg_JFEa"
  },
  {
    "id": "drive-1Be-6661BBTlvvs3L3oprM2ii6RKUFVe_",
    "name": "Alongamento Punho",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Punho. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Be-6661BBTlvvs3L3oprM2ii6RKUFVe_",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Be-6661BBTlvvs3L3oprM2ii6RKUFVe_",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Be-6661BBTlvvs3L3oprM2ii6RKUFVe_"
  },
  {
    "id": "drive-1hbFQSa9etos51QXuCqcp9ci887Fv0Cl8",
    "name": "Alongamento Quadríceps Ajoelhado",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Quadríceps Ajoelhado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1hbFQSa9etos51QXuCqcp9ci887Fv0Cl8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1hbFQSa9etos51QXuCqcp9ci887Fv0Cl8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1hbFQSa9etos51QXuCqcp9ci887Fv0Cl8"
  },
  {
    "id": "drive-1Ry5-6edyp5G6CekCV4vQznmOERI-Rujr",
    "name": "Alongamento Quadríceps em Quatro Apoios",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Quadríceps em Quatro Apoios. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Ry5-6edyp5G6CekCV4vQznmOERI-Rujr",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Ry5-6edyp5G6CekCV4vQznmOERI-Rujr",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Ry5-6edyp5G6CekCV4vQznmOERI-Rujr"
  },
  {
    "id": "drive-1UXKkVphCwF07eI0ffXRyvske36Lx7Sg6",
    "name": "Alongamento Reverso Assistido Peito e Ombro",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Reverso Assistido Peito e Ombro. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1UXKkVphCwF07eI0ffXRyvske36Lx7Sg6",
    "thumbnail": "https://lh3.googleusercontent.com/d/1UXKkVphCwF07eI0ffXRyvske36Lx7Sg6",
    "previewUrl": "https://lh3.googleusercontent.com/d/1UXKkVphCwF07eI0ffXRyvske36Lx7Sg6"
  },
  {
    "id": "drive-1fwcb2eeSI2GNmQrE3HxCIkJSPxfPpT4z",
    "name": "Alongamento Reverso de Pulso",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Reverso de Pulso. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1fwcb2eeSI2GNmQrE3HxCIkJSPxfPpT4z",
    "thumbnail": "https://lh3.googleusercontent.com/d/1fwcb2eeSI2GNmQrE3HxCIkJSPxfPpT4z",
    "previewUrl": "https://lh3.googleusercontent.com/d/1fwcb2eeSI2GNmQrE3HxCIkJSPxfPpT4z"
  },
  {
    "id": "drive-1PaZg2t5S-InCgBoW70gaBsVcB3PMBNTG",
    "name": "Alongamento Sentado Panturrilha Perna Esticada",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Sentado Panturrilha Perna Esticada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PaZg2t5S-InCgBoW70gaBsVcB3PMBNTG",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PaZg2t5S-InCgBoW70gaBsVcB3PMBNTG",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PaZg2t5S-InCgBoW70gaBsVcB3PMBNTG"
  },
  {
    "id": "drive-1rUDCqX6KvBY8MMAI5xx2kHBKOnI_Ent8",
    "name": "Alongamento Tendão de Aquiles em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Tendão de Aquiles em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rUDCqX6KvBY8MMAI5xx2kHBKOnI_Ent8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rUDCqX6KvBY8MMAI5xx2kHBKOnI_Ent8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rUDCqX6KvBY8MMAI5xx2kHBKOnI_Ent8"
  },
  {
    "id": "drive-1haZVJwKmSwpunfNbg0X-9_Xk1sB6szK0",
    "name": "Alongamento Tibial Posterior",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Tibial Posterior. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1haZVJwKmSwpunfNbg0X-9_Xk1sB6szK0",
    "thumbnail": "https://lh3.googleusercontent.com/d/1haZVJwKmSwpunfNbg0X-9_Xk1sB6szK0",
    "previewUrl": "https://lh3.googleusercontent.com/d/1haZVJwKmSwpunfNbg0X-9_Xk1sB6szK0"
  },
  {
    "id": "drive-1ZgbO9bMahsZwgxJ3XBGkUsMJ44b97mtC",
    "name": "Alongamento Trato Iliotibial com Rolo de Espuma",
    "muscleGroup": "Alongamento",
    "equipment": "Rolo de Espuma",
    "instructions": "Execução de Alongamento Trato Iliotibial com Rolo de Espuma. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1ZgbO9bMahsZwgxJ3XBGkUsMJ44b97mtC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1ZgbO9bMahsZwgxJ3XBGkUsMJ44b97mtC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1ZgbO9bMahsZwgxJ3XBGkUsMJ44b97mtC"
  },
  {
    "id": "drive-1WSMC4LATCdqGgJLciw_KPoNWHerJVXyh",
    "name": "Alongamento Tríceps em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamento Tríceps em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WSMC4LATCdqGgJLciw_KPoNWHerJVXyh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WSMC4LATCdqGgJLciw_KPoNWHerJVXyh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WSMC4LATCdqGgJLciw_KPoNWHerJVXyh"
  },
  {
    "id": "drive-12qC9Ap-ZKU0WE0Jjfdshhl5dusjSZoJs",
    "name": "Alongamentos de Pés e Tornozelos",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Alongamentos de Pés e Tornozelos. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12qC9Ap-ZKU0WE0Jjfdshhl5dusjSZoJs",
    "thumbnail": "https://lh3.googleusercontent.com/d/12qC9Ap-ZKU0WE0Jjfdshhl5dusjSZoJs",
    "previewUrl": "https://lh3.googleusercontent.com/d/12qC9Ap-ZKU0WE0Jjfdshhl5dusjSZoJs"
  },
  {
    "id": "drive-1_Z6mMej1p9NqGQnlC0XQ7QmVw9vhuF8R",
    "name": "Arremesso de Bola de Reação",
    "muscleGroup": "Alongamento",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Arremesso de Bola de Reação. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_Z6mMej1p9NqGQnlC0XQ7QmVw9vhuF8R",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_Z6mMej1p9NqGQnlC0XQ7QmVw9vhuF8R",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_Z6mMej1p9NqGQnlC0XQ7QmVw9vhuF8R"
  },
  {
    "id": "drive-1XW3KNI2PM7lZr_9QOWrraFu0-gflypA3",
    "name": "Catavento Corporal",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Catavento Corporal. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XW3KNI2PM7lZr_9QOWrraFu0-gflypA3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XW3KNI2PM7lZr_9QOWrraFu0-gflypA3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XW3KNI2PM7lZr_9QOWrraFu0-gflypA3"
  },
  {
    "id": "drive-1bQfHiYZWR_mu7hUf6omPjVJ44cgW0un1",
    "name": "Contração Abdominal",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Contração Abdominal. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bQfHiYZWR_mu7hUf6omPjVJ44cgW0un1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bQfHiYZWR_mu7hUf6omPjVJ44cgW0un1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bQfHiYZWR_mu7hUf6omPjVJ44cgW0un1"
  },
  {
    "id": "drive-1_qtgAhCBPiNKnrwvRj5QUZ9Ddh5T8rp-",
    "name": "Círculos com Os Braços",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Círculos com Os Braços. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_qtgAhCBPiNKnrwvRj5QUZ9Ddh5T8rp-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_qtgAhCBPiNKnrwvRj5QUZ9Ddh5T8rp-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_qtgAhCBPiNKnrwvRj5QUZ9Ddh5T8rp-"
  },
  {
    "id": "drive-1nO2TMBbFxVpgvpDhvCM9XstWZBE_VNRh",
    "name": "Círculos com Um Braço",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Círculos com Um Braço. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1nO2TMBbFxVpgvpDhvCM9XstWZBE_VNRh",
    "thumbnail": "https://lh3.googleusercontent.com/d/1nO2TMBbFxVpgvpDhvCM9XstWZBE_VNRh",
    "previewUrl": "https://lh3.googleusercontent.com/d/1nO2TMBbFxVpgvpDhvCM9XstWZBE_VNRh"
  },
  {
    "id": "drive-1y8RWNzBb21vVlry4w9hkVzrhxvIx3AL-",
    "name": "Rotação Externa de Ombro com Faixa Elástica",
    "muscleGroup": "Alongamento",
    "equipment": "Elástico / Faixa",
    "instructions": "Execução de Rotação Externa de Ombro com Faixa Elástica. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1y8RWNzBb21vVlry4w9hkVzrhxvIx3AL-",
    "thumbnail": "https://lh3.googleusercontent.com/d/1y8RWNzBb21vVlry4w9hkVzrhxvIx3AL-",
    "previewUrl": "https://lh3.googleusercontent.com/d/1y8RWNzBb21vVlry4w9hkVzrhxvIx3AL-"
  },
  {
    "id": "drive-1Yp4vdXW9mizq4Rcd2O_UkhLGsgxDwlqH",
    "name": "Deslize de Parede do Serrátil com Rolo de Espuma",
    "muscleGroup": "Alongamento",
    "equipment": "Rolo de Espuma",
    "instructions": "Execução de Deslize de Parede do Serrátil com Rolo de Espuma. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Yp4vdXW9mizq4Rcd2O_UkhLGsgxDwlqH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Yp4vdXW9mizq4Rcd2O_UkhLGsgxDwlqH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Yp4vdXW9mizq4Rcd2O_UkhLGsgxDwlqH"
  },
  {
    "id": "drive-1qqAnTzTNuogDCo4h-usyUPNnSc2eREE6",
    "name": "Dorsiflexão Plantar",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Dorsiflexão Plantar. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qqAnTzTNuogDCo4h-usyUPNnSc2eREE6",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qqAnTzTNuogDCo4h-usyUPNnSc2eREE6",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qqAnTzTNuogDCo4h-usyUPNnSc2eREE6"
  },
  {
    "id": "drive-1sjRrgJJJTEZbRfNZbJuWOw3DHkQ4Ks5P",
    "name": "Elevação Lateral de Deltóide Posterior com Halteres",
    "muscleGroup": "Alongamento",
    "equipment": "Halteres",
    "instructions": "Execução de Elevação Lateral de Deltóide Posterior com Halteres. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1sjRrgJJJTEZbRfNZbJuWOw3DHkQ4Ks5P",
    "thumbnail": "https://lh3.googleusercontent.com/d/1sjRrgJJJTEZbRfNZbJuWOw3DHkQ4Ks5P",
    "previewUrl": "https://lh3.googleusercontent.com/d/1sjRrgJJJTEZbRfNZbJuWOw3DHkQ4Ks5P"
  },
  {
    "id": "drive-1j9m96oaI_jRqDRkkr5BBlJ9ZtgULlZ-1",
    "name": "Exercício de Bailarina Sentada",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Exercício de Bailarina Sentada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1j9m96oaI_jRqDRkkr5BBlJ9ZtgULlZ-1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1j9m96oaI_jRqDRkkr5BBlJ9ZtgULlZ-1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1j9m96oaI_jRqDRkkr5BBlJ9ZtgULlZ-1"
  },
  {
    "id": "drive-14_nGtX1awFoCBm5gemrToWmVEgh1BbbF",
    "name": "Exercício Retração Escapular Sentada",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Exercício Retração Escapular Sentada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14_nGtX1awFoCBm5gemrToWmVEgh1BbbF",
    "thumbnail": "https://lh3.googleusercontent.com/d/14_nGtX1awFoCBm5gemrToWmVEgh1BbbF",
    "previewUrl": "https://lh3.googleusercontent.com/d/14_nGtX1awFoCBm5gemrToWmVEgh1BbbF"
  },
  {
    "id": "drive-1NgxYzIUjB_dcwFX7k3z34JS9gC4VmOmo",
    "name": "Flexão Alternada Ombro",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Flexão Alternada Ombro. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1NgxYzIUjB_dcwFX7k3z34JS9gC4VmOmo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1NgxYzIUjB_dcwFX7k3z34JS9gC4VmOmo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1NgxYzIUjB_dcwFX7k3z34JS9gC4VmOmo"
  },
  {
    "id": "drive-1n7VrRwBPuNUSWfZiLqYRZcyWHtCzpBkp",
    "name": "Inclinação Lateral",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Inclinação Lateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1n7VrRwBPuNUSWfZiLqYRZcyWHtCzpBkp",
    "thumbnail": "https://lh3.googleusercontent.com/d/1n7VrRwBPuNUSWfZiLqYRZcyWHtCzpBkp",
    "previewUrl": "https://lh3.googleusercontent.com/d/1n7VrRwBPuNUSWfZiLqYRZcyWHtCzpBkp"
  },
  {
    "id": "drive-1-z3Cc3IcYhX9EZ5yqYltRFoGJRppqPV7",
    "name": "Inclinação Lateral em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Inclinação Lateral em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-z3Cc3IcYhX9EZ5yqYltRFoGJRppqPV7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-z3Cc3IcYhX9EZ5yqYltRFoGJRppqPV7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-z3Cc3IcYhX9EZ5yqYltRFoGJRppqPV7"
  },
  {
    "id": "drive-1if-5odFmIhNmjZXfPdq6XTP0TLXqTBKV",
    "name": "Joelho Alternado no Peito",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Joelho Alternado no Peito. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1if-5odFmIhNmjZXfPdq6XTP0TLXqTBKV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1if-5odFmIhNmjZXfPdq6XTP0TLXqTBKV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1if-5odFmIhNmjZXfPdq6XTP0TLXqTBKV"
  },
  {
    "id": "drive-1_C7EqBHosUOLSJ91xACVTaebBMEgKUaI",
    "name": "Levantamento de Braço Apoiado na Parede",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Levantamento de Braço Apoiado na Parede. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1_C7EqBHosUOLSJ91xACVTaebBMEgKUaI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1_C7EqBHosUOLSJ91xACVTaebBMEgKUaI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1_C7EqBHosUOLSJ91xACVTaebBMEgKUaI"
  },
  {
    "id": "drive-1AdH1mp6g1jeXHMwRh4l9dWc57e0WUUZT",
    "name": "Postura Arco",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura Arco. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1AdH1mp6g1jeXHMwRh4l9dWc57e0WUUZT",
    "thumbnail": "https://lh3.googleusercontent.com/d/1AdH1mp6g1jeXHMwRh4l9dWc57e0WUUZT",
    "previewUrl": "https://lh3.googleusercontent.com/d/1AdH1mp6g1jeXHMwRh4l9dWc57e0WUUZT"
  },
  {
    "id": "drive-1Vn0M-H40wM1IZ-FIzhBlWVPhFI8gkoE7",
    "name": "Postura Arco Oscilante",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura Arco Oscilante. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Vn0M-H40wM1IZ-FIzhBlWVPhFI8gkoE7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Vn0M-H40wM1IZ-FIzhBlWVPhFI8gkoE7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Vn0M-H40wM1IZ-FIzhBlWVPhFI8gkoE7"
  },
  {
    "id": "drive-14cAXpS0vvDcgHS248pqtGmhzCAkKkW0b",
    "name": "Postura da Cobra - Alongamento Abdominal",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura da Cobra - Alongamento Abdominal. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/14cAXpS0vvDcgHS248pqtGmhzCAkKkW0b",
    "thumbnail": "https://lh3.googleusercontent.com/d/14cAXpS0vvDcgHS248pqtGmhzCAkKkW0b",
    "previewUrl": "https://lh3.googleusercontent.com/d/14cAXpS0vvDcgHS248pqtGmhzCAkKkW0b"
  },
  {
    "id": "drive-1WrUsd9cD5c3VVLSMvzJcG0tCYGEsaud3",
    "name": "Postura da Borboleta (Virilha Sentada)",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura da Borboleta (Virilha Sentada). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WrUsd9cD5c3VVLSMvzJcG0tCYGEsaud3",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WrUsd9cD5c3VVLSMvzJcG0tCYGEsaud3",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WrUsd9cD5c3VVLSMvzJcG0tCYGEsaud3"
  },
  {
    "id": "drive-1sJSeT2DTMVBgixPxeuoMdU6zl14VqbIq",
    "name": "Postura de Meio Sapo",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura de Meio Sapo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1sJSeT2DTMVBgixPxeuoMdU6zl14VqbIq",
    "thumbnail": "https://lh3.googleusercontent.com/d/1sJSeT2DTMVBgixPxeuoMdU6zl14VqbIq",
    "previewUrl": "https://lh3.googleusercontent.com/d/1sJSeT2DTMVBgixPxeuoMdU6zl14VqbIq"
  },
  {
    "id": "drive-1h8dGZZniXg2XX-lWXIxM3PjvkpxjEch7",
    "name": "Postura de Peixe",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura de Peixe. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1h8dGZZniXg2XX-lWXIxM3PjvkpxjEch7",
    "thumbnail": "https://lh3.googleusercontent.com/d/1h8dGZZniXg2XX-lWXIxM3PjvkpxjEch7",
    "previewUrl": "https://lh3.googleusercontent.com/d/1h8dGZZniXg2XX-lWXIxM3PjvkpxjEch7"
  },
  {
    "id": "drive-1DQL5EUOVHyyNcOyxvglkTinXBR-rqikC",
    "name": "Postura do Bebê Feliz",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura do Bebê Feliz. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DQL5EUOVHyyNcOyxvglkTinXBR-rqikC",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DQL5EUOVHyyNcOyxvglkTinXBR-rqikC",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DQL5EUOVHyyNcOyxvglkTinXBR-rqikC"
  },
  {
    "id": "drive-1-AF5zV7EHIhoAS2rTDXUAfS8luPxE26V",
    "name": "Postura Sapo",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Postura Sapo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-AF5zV7EHIhoAS2rTDXUAfS8luPxE26V",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-AF5zV7EHIhoAS2rTDXUAfS8luPxE26V",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-AF5zV7EHIhoAS2rTDXUAfS8luPxE26V"
  },
  {
    "id": "drive-1dLh5DFQyNhw-e2hVtdDVBUoTI96l73Oz",
    "name": "Protração e Retração da Escápula",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Protração e Retração da Escápula. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1dLh5DFQyNhw-e2hVtdDVBUoTI96l73Oz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1dLh5DFQyNhw-e2hVtdDVBUoTI96l73Oz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1dLh5DFQyNhw-e2hVtdDVBUoTI96l73Oz"
  },
  {
    "id": "drive-184fV6u4DDjorUZ9HZpzk-eU3xnT-vmia",
    "name": "Puxada Escapular na Barra Fixa",
    "muscleGroup": "Alongamento",
    "equipment": "Barra",
    "instructions": "Execução de Puxada Escapular na Barra Fixa. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/184fV6u4DDjorUZ9HZpzk-eU3xnT-vmia",
    "thumbnail": "https://lh3.googleusercontent.com/d/184fV6u4DDjorUZ9HZpzk-eU3xnT-vmia",
    "previewUrl": "https://lh3.googleusercontent.com/d/184fV6u4DDjorUZ9HZpzk-eU3xnT-vmia"
  },
  {
    "id": "drive-1mD7OqDpFg14oe2GNGYvS8k9qs4tM2meY",
    "name": "Pêndulo de Ombro",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Pêndulo de Ombro. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mD7OqDpFg14oe2GNGYvS8k9qs4tM2meY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mD7OqDpFg14oe2GNGYvS8k9qs4tM2meY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mD7OqDpFg14oe2GNGYvS8k9qs4tM2meY"
  },
  {
    "id": "drive-1rZ1AStY7PLtHGmGy8--5sQd7syN0UKA5",
    "name": "Quadrúpede com Elevação de Braço e Perna Contralateral",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Quadrúpede com Elevação de Braço e Perna Contralateral. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1rZ1AStY7PLtHGmGy8--5sQd7syN0UKA5",
    "thumbnail": "https://lh3.googleusercontent.com/d/1rZ1AStY7PLtHGmGy8--5sQd7syN0UKA5",
    "previewUrl": "https://lh3.googleusercontent.com/d/1rZ1AStY7PLtHGmGy8--5sQd7syN0UKA5"
  },
  {
    "id": "drive-1DZG9Gl6lbyRSJTvWkKTAGOUd6p_zQg-W",
    "name": "Rolagem de Espuma para Isquiotibiais",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rolagem de Espuma para Isquiotibiais. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1DZG9Gl6lbyRSJTvWkKTAGOUd6p_zQg-W",
    "thumbnail": "https://lh3.googleusercontent.com/d/1DZG9Gl6lbyRSJTvWkKTAGOUd6p_zQg-W",
    "previewUrl": "https://lh3.googleusercontent.com/d/1DZG9Gl6lbyRSJTvWkKTAGOUd6p_zQg-W"
  },
  {
    "id": "drive-1BZfUdFkPBIVRkWn0uvbf6K7FR2fZBJfy",
    "name": "Rolamento de Espuma nas Costas",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rolamento de Espuma nas Costas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1BZfUdFkPBIVRkWn0uvbf6K7FR2fZBJfy",
    "thumbnail": "https://lh3.googleusercontent.com/d/1BZfUdFkPBIVRkWn0uvbf6K7FR2fZBJfy",
    "previewUrl": "https://lh3.googleusercontent.com/d/1BZfUdFkPBIVRkWn0uvbf6K7FR2fZBJfy"
  },
  {
    "id": "drive-1qvO_BQoGB74ALGg6_thbDPkkqOJpSL8P",
    "name": "Rolamento de Espuma nos Quadríceps",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rolamento de Espuma nos Quadríceps. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1qvO_BQoGB74ALGg6_thbDPkkqOJpSL8P",
    "thumbnail": "https://lh3.googleusercontent.com/d/1qvO_BQoGB74ALGg6_thbDPkkqOJpSL8P",
    "previewUrl": "https://lh3.googleusercontent.com/d/1qvO_BQoGB74ALGg6_thbDPkkqOJpSL8P"
  },
  {
    "id": "drive-1A4SkjD9iUHMxW9S_EB62rj7o0GcLvXfo",
    "name": "Rolamento de Espuma nos Romboides",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rolamento de Espuma nos Romboides. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1A4SkjD9iUHMxW9S_EB62rj7o0GcLvXfo",
    "thumbnail": "https://lh3.googleusercontent.com/d/1A4SkjD9iUHMxW9S_EB62rj7o0GcLvXfo",
    "previewUrl": "https://lh3.googleusercontent.com/d/1A4SkjD9iUHMxW9S_EB62rj7o0GcLvXfo"
  },
  {
    "id": "drive-1aZCmAqNMOamlzcSGK2GN89sB8kbyH2zu",
    "name": "Rolamento de Espuma para Panturrilhas",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rolamento de Espuma para Panturrilhas. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1aZCmAqNMOamlzcSGK2GN89sB8kbyH2zu",
    "thumbnail": "https://lh3.googleusercontent.com/d/1aZCmAqNMOamlzcSGK2GN89sB8kbyH2zu",
    "previewUrl": "https://lh3.googleusercontent.com/d/1aZCmAqNMOamlzcSGK2GN89sB8kbyH2zu"
  },
  {
    "id": "drive-1lbV6inEfkphey6x7zwh6o3PK85nCtY0K",
    "name": "Rolando com Bola",
    "muscleGroup": "Alongamento",
    "equipment": "Bola Suíça",
    "instructions": "Execução de Rolando com Bola. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1lbV6inEfkphey6x7zwh6o3PK85nCtY0K",
    "thumbnail": "https://lh3.googleusercontent.com/d/1lbV6inEfkphey6x7zwh6o3PK85nCtY0K",
    "previewUrl": "https://lh3.googleusercontent.com/d/1lbV6inEfkphey6x7zwh6o3PK85nCtY0K"
  },
  {
    "id": "drive-1E6fWJXKq0qk1y9pn18jDhYtdU-00uHt9",
    "name": "Rolo de Espuma Ombro Posterior",
    "muscleGroup": "Alongamento",
    "equipment": "Rolo de Espuma",
    "instructions": "Execução de Rolo de Espuma Ombro Posterior. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1E6fWJXKq0qk1y9pn18jDhYtdU-00uHt9",
    "thumbnail": "https://lh3.googleusercontent.com/d/1E6fWJXKq0qk1y9pn18jDhYtdU-00uHt9",
    "previewUrl": "https://lh3.googleusercontent.com/d/1E6fWJXKq0qk1y9pn18jDhYtdU-00uHt9"
  },
  {
    "id": "drive-1PaoBYWm64e5YoQMmjCriFgvWsUL1oG99",
    "name": "Rolo de Espuma para Fascite Plantar",
    "muscleGroup": "Alongamento",
    "equipment": "Rolo de Espuma",
    "instructions": "Execução de Rolo de Espuma para Fascite Plantar. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1PaoBYWm64e5YoQMmjCriFgvWsUL1oG99",
    "thumbnail": "https://lh3.googleusercontent.com/d/1PaoBYWm64e5YoQMmjCriFgvWsUL1oG99",
    "previewUrl": "https://lh3.googleusercontent.com/d/1PaoBYWm64e5YoQMmjCriFgvWsUL1oG99"
  },
  {
    "id": "drive-1xFiza-_uEDV6YeHHi6yTY8GLA83Be22Y",
    "name": "Rolo de Espuma para Ombro e Peito Frontal",
    "muscleGroup": "Alongamento",
    "equipment": "Rolo de Espuma",
    "instructions": "Execução de Rolo de Espuma para Ombro e Peito Frontal. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1xFiza-_uEDV6YeHHi6yTY8GLA83Be22Y",
    "thumbnail": "https://lh3.googleusercontent.com/d/1xFiza-_uEDV6YeHHi6yTY8GLA83Be22Y",
    "previewUrl": "https://lh3.googleusercontent.com/d/1xFiza-_uEDV6YeHHi6yTY8GLA83Be22Y"
  },
  {
    "id": "drive-1TxiCw-5DRaxiFTxpDFo-oKASNDhv6NjM",
    "name": "Rolo de Espuma para Os Glúteos",
    "muscleGroup": "Alongamento",
    "equipment": "Rolo de Espuma",
    "instructions": "Execução de Rolo de Espuma para Os Glúteos. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1TxiCw-5DRaxiFTxpDFo-oKASNDhv6NjM",
    "thumbnail": "https://lh3.googleusercontent.com/d/1TxiCw-5DRaxiFTxpDFo-oKASNDhv6NjM",
    "previewUrl": "https://lh3.googleusercontent.com/d/1TxiCw-5DRaxiFTxpDFo-oKASNDhv6NjM"
  },
  {
    "id": "drive-1mO_gcwitPuIOee2PCaBaTw7s-E7VztWP",
    "name": "Rotação Corpo Superior Deitado",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação Corpo Superior Deitado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1mO_gcwitPuIOee2PCaBaTw7s-E7VztWP",
    "thumbnail": "https://lh3.googleusercontent.com/d/1mO_gcwitPuIOee2PCaBaTw7s-E7VztWP",
    "previewUrl": "https://lh3.googleusercontent.com/d/1mO_gcwitPuIOee2PCaBaTw7s-E7VztWP"
  },
  {
    "id": "drive-1-9ADSnMw4yf37ljIJLAvTLN5Exmkjtot",
    "name": "Rotação da Coluna Torácica de Joelhos",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação da Coluna Torácica de Joelhos. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1-9ADSnMw4yf37ljIJLAvTLN5Exmkjtot",
    "thumbnail": "https://lh3.googleusercontent.com/d/1-9ADSnMw4yf37ljIJLAvTLN5Exmkjtot",
    "previewUrl": "https://lh3.googleusercontent.com/d/1-9ADSnMw4yf37ljIJLAvTLN5Exmkjtot"
  },
  {
    "id": "drive-1bF8rNHuBlYsUXJYLgsLNeeOQi3j4EPBQ",
    "name": "Rotação de Pé e Tornozelo",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação de Pé e Tornozelo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1bF8rNHuBlYsUXJYLgsLNeeOQi3j4EPBQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1bF8rNHuBlYsUXJYLgsLNeeOQi3j4EPBQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1bF8rNHuBlYsUXJYLgsLNeeOQi3j4EPBQ"
  },
  {
    "id": "drive-1kLaxpkJjC6ewEevlP0bU1ZM7mSeYAMW8",
    "name": "Rotação em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1kLaxpkJjC6ewEevlP0bU1ZM7mSeYAMW8",
    "thumbnail": "https://lh3.googleusercontent.com/d/1kLaxpkJjC6ewEevlP0bU1ZM7mSeYAMW8",
    "previewUrl": "https://lh3.googleusercontent.com/d/1kLaxpkJjC6ewEevlP0bU1ZM7mSeYAMW8"
  },
  {
    "id": "drive-1Rie3jwEKWl3bx-xW536AszMEy4h1h5Hi",
    "name": "Rotação Espinhal Deitado",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação Espinhal Deitado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Rie3jwEKWl3bx-xW536AszMEy4h1h5Hi",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Rie3jwEKWl3bx-xW536AszMEy4h1h5Hi",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Rie3jwEKWl3bx-xW536AszMEy4h1h5Hi"
  },
  {
    "id": "drive-1wUoSF8qviTkp9Ul2lYwc31KBfLm9STwi",
    "name": "Rotação Externa com Cabo a 90 Graus",
    "muscleGroup": "Alongamento",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rotação Externa com Cabo a 90 Graus. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1wUoSF8qviTkp9Ul2lYwc31KBfLm9STwi",
    "thumbnail": "https://lh3.googleusercontent.com/d/1wUoSF8qviTkp9Ul2lYwc31KBfLm9STwi",
    "previewUrl": "https://lh3.googleusercontent.com/d/1wUoSF8qviTkp9Ul2lYwc31KBfLm9STwi"
  },
  {
    "id": "drive-1jxcFtkPXeRi0kWmRNOEXRbi1Xd9E2y29",
    "name": "Rotação Externa com Cabo em Posição de Joelhos",
    "muscleGroup": "Alongamento",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rotação Externa com Cabo em Posição de Joelhos. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1jxcFtkPXeRi0kWmRNOEXRbi1Xd9E2y29",
    "thumbnail": "https://lh3.googleusercontent.com/d/1jxcFtkPXeRi0kWmRNOEXRbi1Xd9E2y29",
    "previewUrl": "https://lh3.googleusercontent.com/d/1jxcFtkPXeRi0kWmRNOEXRbi1Xd9E2y29"
  },
  {
    "id": "drive-12Joh8nX4EDz67pLE1u9oGcLU8H9ARWmG",
    "name": "Rotação Externa de Ombro com Cabo",
    "muscleGroup": "Alongamento",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rotação Externa de Ombro com Cabo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/12Joh8nX4EDz67pLE1u9oGcLU8H9ARWmG",
    "thumbnail": "https://lh3.googleusercontent.com/d/12Joh8nX4EDz67pLE1u9oGcLU8H9ARWmG",
    "previewUrl": "https://lh3.googleusercontent.com/d/12Joh8nX4EDz67pLE1u9oGcLU8H9ARWmG"
  },
  {
    "id": "drive-1Gyg26PTs0ffN3iOi0PXGMnPU1slZeDnI",
    "name": "Rotação Externa de Ombro com Faixa Elástica (Variação 2)",
    "muscleGroup": "Alongamento",
    "equipment": "Elástico / Faixa",
    "instructions": "Execução de Rotação Externa de Ombro com Faixa Elástica (Variação 2). Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1Gyg26PTs0ffN3iOi0PXGMnPU1slZeDnI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1Gyg26PTs0ffN3iOi0PXGMnPU1slZeDnI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1Gyg26PTs0ffN3iOi0PXGMnPU1slZeDnI"
  },
  {
    "id": "drive-1iwsVig2mEMKyzFndCXcRlTdXKjF7a00l",
    "name": "Rotação Externa de Quadril com Faixa Elástica",
    "muscleGroup": "Alongamento",
    "equipment": "Elástico / Faixa",
    "instructions": "Execução de Rotação Externa de Quadril com Faixa Elástica. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1iwsVig2mEMKyzFndCXcRlTdXKjF7a00l",
    "thumbnail": "https://lh3.googleusercontent.com/d/1iwsVig2mEMKyzFndCXcRlTdXKjF7a00l",
    "previewUrl": "https://lh3.googleusercontent.com/d/1iwsVig2mEMKyzFndCXcRlTdXKjF7a00l"
  },
  {
    "id": "drive-1JgEnRpXv89Aka64s_QElMHGo33WHaMK2",
    "name": "Rotação Externa de Quadril Sentado com Faixa Elástica",
    "muscleGroup": "Alongamento",
    "equipment": "Elástico / Faixa",
    "instructions": "Execução de Rotação Externa de Quadril Sentado com Faixa Elástica. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1JgEnRpXv89Aka64s_QElMHGo33WHaMK2",
    "thumbnail": "https://lh3.googleusercontent.com/d/1JgEnRpXv89Aka64s_QElMHGo33WHaMK2",
    "previewUrl": "https://lh3.googleusercontent.com/d/1JgEnRpXv89Aka64s_QElMHGo33WHaMK2"
  },
  {
    "id": "drive-1F-VXrfSJVb1ihu08CGp7nZlx-mu87nTz",
    "name": "Rotação Externa do Ombro",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação Externa do Ombro. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1F-VXrfSJVb1ihu08CGp7nZlx-mu87nTz",
    "thumbnail": "https://lh3.googleusercontent.com/d/1F-VXrfSJVb1ihu08CGp7nZlx-mu87nTz",
    "previewUrl": "https://lh3.googleusercontent.com/d/1F-VXrfSJVb1ihu08CGp7nZlx-mu87nTz"
  },
  {
    "id": "drive-1XFLgytc0Z9qz9xellElbhHZfh6zzCFLQ",
    "name": "Rotação Externa do Ombro Deitado com Haltere",
    "muscleGroup": "Alongamento",
    "equipment": "Halteres",
    "instructions": "Execução de Rotação Externa do Ombro Deitado com Haltere. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1XFLgytc0Z9qz9xellElbhHZfh6zzCFLQ",
    "thumbnail": "https://lh3.googleusercontent.com/d/1XFLgytc0Z9qz9xellElbhHZfh6zzCFLQ",
    "previewUrl": "https://lh3.googleusercontent.com/d/1XFLgytc0Z9qz9xellElbhHZfh6zzCFLQ"
  },
  {
    "id": "drive-1l67I9WftfkaixfWmAizFyeEsTBrHnxEV",
    "name": "Rotação Externa do Pé com Faixa Elástica",
    "muscleGroup": "Alongamento",
    "equipment": "Elástico / Faixa",
    "instructions": "Execução de Rotação Externa do Pé com Faixa Elástica. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1l67I9WftfkaixfWmAizFyeEsTBrHnxEV",
    "thumbnail": "https://lh3.googleusercontent.com/d/1l67I9WftfkaixfWmAizFyeEsTBrHnxEV",
    "previewUrl": "https://lh3.googleusercontent.com/d/1l67I9WftfkaixfWmAizFyeEsTBrHnxEV"
  },
  {
    "id": "drive-1vAM1U27kfbHpbZtyynl1mY1t95GyRBxp",
    "name": "Rotação Externa Halteres Apoiada no Banco",
    "muscleGroup": "Alongamento",
    "equipment": "Halteres",
    "instructions": "Execução de Rotação Externa Halteres Apoiada no Banco. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1vAM1U27kfbHpbZtyynl1mY1t95GyRBxp",
    "thumbnail": "https://lh3.googleusercontent.com/d/1vAM1U27kfbHpbZtyynl1mY1t95GyRBxp",
    "previewUrl": "https://lh3.googleusercontent.com/d/1vAM1U27kfbHpbZtyynl1mY1t95GyRBxp"
  },
  {
    "id": "drive-1r5dEAe2DlOMu0qdFQGQ5rqTSNzzJy5pI",
    "name": "Rotação Interna de Cabo a 90 Graus",
    "muscleGroup": "Alongamento",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rotação Interna de Cabo a 90 Graus. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1r5dEAe2DlOMu0qdFQGQ5rqTSNzzJy5pI",
    "thumbnail": "https://lh3.googleusercontent.com/d/1r5dEAe2DlOMu0qdFQGQ5rqTSNzzJy5pI",
    "previewUrl": "https://lh3.googleusercontent.com/d/1r5dEAe2DlOMu0qdFQGQ5rqTSNzzJy5pI"
  },
  {
    "id": "drive-1b1IJSjowonYMnyTqfIi4OsAt97fiRjhv",
    "name": "Rotação Interna de Ombro com Cabo",
    "muscleGroup": "Alongamento",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rotação Interna de Ombro com Cabo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1b1IJSjowonYMnyTqfIi4OsAt97fiRjhv",
    "thumbnail": "https://lh3.googleusercontent.com/d/1b1IJSjowonYMnyTqfIi4OsAt97fiRjhv",
    "previewUrl": "https://lh3.googleusercontent.com/d/1b1IJSjowonYMnyTqfIi4OsAt97fiRjhv"
  },
  {
    "id": "drive-16fYqDqIIBfFGvJ2wrFmOWQJtAi1GVial",
    "name": "Rotação Interna do Ombro",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação Interna do Ombro. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/16fYqDqIIBfFGvJ2wrFmOWQJtAi1GVial",
    "thumbnail": "https://lh3.googleusercontent.com/d/16fYqDqIIBfFGvJ2wrFmOWQJtAi1GVial",
    "previewUrl": "https://lh3.googleusercontent.com/d/16fYqDqIIBfFGvJ2wrFmOWQJtAi1GVial"
  },
  {
    "id": "drive-1sWodb3pypGeB1Tz3B_mnoTKphWBCQT7a",
    "name": "Rotação Interna do Ombro Sentada com Cabo",
    "muscleGroup": "Alongamento",
    "equipment": "Polia / Cabo",
    "instructions": "Execução de Rotação Interna do Ombro Sentada com Cabo. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1sWodb3pypGeB1Tz3B_mnoTKphWBCQT7a",
    "thumbnail": "https://lh3.googleusercontent.com/d/1sWodb3pypGeB1Tz3B_mnoTKphWBCQT7a",
    "previewUrl": "https://lh3.googleusercontent.com/d/1sWodb3pypGeB1Tz3B_mnoTKphWBCQT7a"
  },
  {
    "id": "drive-161RNd63TVVF5R6lQWPOUq6ZjOidQpNKV",
    "name": "Rotação Interna do Quadril Sentado com Faixa Elástica",
    "muscleGroup": "Alongamento",
    "equipment": "Elástico / Faixa",
    "instructions": "Execução de Rotação Interna do Quadril Sentado com Faixa Elástica. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/161RNd63TVVF5R6lQWPOUq6ZjOidQpNKV",
    "thumbnail": "https://lh3.googleusercontent.com/d/161RNd63TVVF5R6lQWPOUq6ZjOidQpNKV",
    "previewUrl": "https://lh3.googleusercontent.com/d/161RNd63TVVF5R6lQWPOUq6ZjOidQpNKV"
  },
  {
    "id": "drive-1M-YYl3XCpkA31V-KGS_9fKvWxwwbw5nH",
    "name": "Rotação para Trás Joelhos",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Rotação para Trás Joelhos. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1M-YYl3XCpkA31V-KGS_9fKvWxwwbw5nH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1M-YYl3XCpkA31V-KGS_9fKvWxwwbw5nH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1M-YYl3XCpkA31V-KGS_9fKvWxwwbw5nH"
  },
  {
    "id": "drive-1WZMdr6mdwl06GHVLIhkdn-N573xzS4mc",
    "name": "Superman",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Superman. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1WZMdr6mdwl06GHVLIhkdn-N573xzS4mc",
    "thumbnail": "https://lh3.googleusercontent.com/d/1WZMdr6mdwl06GHVLIhkdn-N573xzS4mc",
    "previewUrl": "https://lh3.googleusercontent.com/d/1WZMdr6mdwl06GHVLIhkdn-N573xzS4mc"
  },
  {
    "id": "drive-1s_zPdsJfNxnXH3a3GL33_7PHNp3IPx4I",
    "name": "Toque Lateral dos Dedos dos Pés em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Toque Lateral dos Dedos dos Pés em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1s_zPdsJfNxnXH3a3GL33_7PHNp3IPx4I",
    "thumbnail": "https://lh3.googleusercontent.com/d/1s_zPdsJfNxnXH3a3GL33_7PHNp3IPx4I",
    "previewUrl": "https://lh3.googleusercontent.com/d/1s_zPdsJfNxnXH3a3GL33_7PHNp3IPx4I"
  },
  {
    "id": "drive-1RBnUrx3YU89A_RtzfGngmpC3RE3xukBT",
    "name": "Toque nos Dedos dos Pés em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Toque nos Dedos dos Pés em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1RBnUrx3YU89A_RtzfGngmpC3RE3xukBT",
    "thumbnail": "https://lh3.googleusercontent.com/d/1RBnUrx3YU89A_RtzfGngmpC3RE3xukBT",
    "previewUrl": "https://lh3.googleusercontent.com/d/1RBnUrx3YU89A_RtzfGngmpC3RE3xukBT"
  },
  {
    "id": "drive-1nJmQGuoKsUwZ9FcEOULgbeJUqdzjjQEY",
    "name": "Toque nos Dedos dos Pés Sentado",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Toque nos Dedos dos Pés Sentado. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1nJmQGuoKsUwZ9FcEOULgbeJUqdzjjQEY",
    "thumbnail": "https://lh3.googleusercontent.com/d/1nJmQGuoKsUwZ9FcEOULgbeJUqdzjjQEY",
    "previewUrl": "https://lh3.googleusercontent.com/d/1nJmQGuoKsUwZ9FcEOULgbeJUqdzjjQEY"
  },
  {
    "id": "drive-1QLZrTKIp9d06xz-ncNLh-bZaiGPtigs1",
    "name": "Toques de Dedos em Pé",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Toques de Dedos em Pé. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1QLZrTKIp9d06xz-ncNLh-bZaiGPtigs1",
    "thumbnail": "https://lh3.googleusercontent.com/d/1QLZrTKIp9d06xz-ncNLh-bZaiGPtigs1",
    "previewUrl": "https://lh3.googleusercontent.com/d/1QLZrTKIp9d06xz-ncNLh-bZaiGPtigs1"
  },
  {
    "id": "drive-1d7SzC0aptnjXNFFCU66M8VygKpQHsmoH",
    "name": "Torção Oblíqua Sentada",
    "muscleGroup": "Alongamento",
    "equipment": "Peso Corporal / Solo",
    "instructions": "Execução de Torção Oblíqua Sentada. Mantenha a postura adequada, controle a cadência do movimento e respeite sua amplitude articular durante toda a série.",
    "gifUrl": "https://lh3.googleusercontent.com/d/1d7SzC0aptnjXNFFCU66M8VygKpQHsmoH",
    "thumbnail": "https://lh3.googleusercontent.com/d/1d7SzC0aptnjXNFFCU66M8VygKpQHsmoH",
    "previewUrl": "https://lh3.googleusercontent.com/d/1d7SzC0aptnjXNFFCU66M8VygKpQHsmoH"
  }
];


function normalizeSlug(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export function enrichExerciseMedia(ex: Exercise): Exercise {
  if (!ex) return ex;
  if (!ex.gifUrl || ex.gifUrl.trim() === '') {
    const gif = findBestExerciseGif(ex.name, ex.muscleGroup);
    if (gif) {
      return { ...ex, gifUrl: gif };
    }
  }
  return ex;
}

export function findExerciseById(idOrName?: string): Exercise {
  let matched: Exercise;

  if (!idOrName || !EXERCISE_DATABASE.length) {
    matched = EXERCISE_DATABASE[0] || {
      id: 'default',
      name: 'Exercício',
      muscleGroup: 'Geral',
      equipment: '-'
    };
  } else {
    // 1. Direct match by exact ID
    const directMatch = EXERCISE_DATABASE.find(e => e.id === idOrName);
    if (directMatch) {
      matched = directMatch;
    } else {
      // 2. Match GUID inside the string
      const guidMatch = idOrName.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
      if (guidMatch) {
        const byGuid = EXERCISE_DATABASE.find(e => e.id.toLowerCase() === guidMatch[0].toLowerCase());
        if (byGuid) matched = byGuid;
        else matched = EXERCISE_DATABASE[0];
      } else {
        // 3. Match normalized slug / name
        const targetSlug = normalizeSlug(idOrName);
        const bySlug = EXERCISE_DATABASE.find(e => {
          const eSlug = normalizeSlug(e.name);
          return eSlug === targetSlug || (targetSlug.length > 5 && (targetSlug.includes(eSlug) || eSlug.includes(targetSlug)));
        });

        if (bySlug) {
          matched = bySlug;
        } else {
          // 4. Match keywords
          const keywords = idOrName.toLowerCase().split(/[-_ ]+/).filter(w => w.length > 3);
          if (keywords.length > 0) {
            const byKeyword = EXERCISE_DATABASE.find(e => {
              const eName = e.name.toLowerCase();
              return keywords.filter(k => eName.includes(k)).length >= Math.min(2, keywords.length);
            });
            matched = byKeyword || EXERCISE_DATABASE[0];
          } else {
            matched = EXERCISE_DATABASE[0];
          }
        }
      }
    }
  }

  return enrichExerciseMedia(matched);
}
