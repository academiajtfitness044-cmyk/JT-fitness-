export interface FoodDatabaseItem {
  id: string;
  name: string;
  quantity: number; // base 100g or 100ml
  kcals: number;
  protein: number;
  carbs: number;
  fats: number;
  category: string;
}

export const FOOD_DATABASE: FoodDatabaseItem[] = [
  // PROTEÍNAS - CARNES BOVINAS
  { id: '1', name: 'Peito de Frango Grelhado', quantity: 100, kcals: 163, protein: 31.5, carbs: 0, fats: 3.2, category: 'Proteínas' },
  { id: '2', name: 'Sobrecoxa de Frango Sem Pele Assada', quantity: 100, kcals: 167, protein: 25, carbs: 0, fats: 7.4, category: 'Proteínas' },
  { id: '3', name: 'Carne Moída Patinho Grelhado', quantity: 100, kcals: 219, protein: 35.9, carbs: 0, fats: 7.3, category: 'Proteínas' },
  { id: '9', name: 'Alcatra Grelhada', quantity: 100, kcals: 241, protein: 31.9, carbs: 0, fats: 11.6, category: 'Proteínas' },
  { id: '10c', name: 'Contrafilé Grelhado', quantity: 100, kcals: 260, protein: 29.8, carbs: 0, fats: 14.8, category: 'Proteínas' },
  { id: '10a', name: 'Músculo Bovino Cozido', quantity: 100, kcals: 194, protein: 31.2, carbs: 0, fats: 6.7, category: 'Proteínas' },
  { id: '10d', name: 'Coxão Mole Grelhado', quantity: 100, kcals: 219, protein: 32.4, carbs: 0, fats: 8.9, category: 'Proteínas' },
  { id: '10e', name: 'Filé Mignon Grelhado', quantity: 100, kcals: 220, protein: 32.8, carbs: 0, fats: 8.8, category: 'Proteínas' },
  { id: '10f', name: 'Picanha Grelhada (Sem Gordura)', quantity: 100, kcals: 238, protein: 26.2, carbs: 0, fats: 12.1, category: 'Proteínas' },
  { id: '10g', name: 'Fígado de Boi Grelhado', quantity: 100, kcals: 225, protein: 29.9, carbs: 3.9, fats: 9, category: 'Proteínas' },

  // PROTEÍNAS - OUTROS
  { id: '4', name: 'Ovo de Galinha Cozido', quantity: 100, kcals: 146, protein: 13.3, carbs: 0.6, fats: 9.5, category: 'Proteínas' },
  { id: '5', name: 'Clara de Ovo de Galinha', quantity: 100, kcals: 52, protein: 11, carbs: 0.7, fats: 0.2, category: 'Proteínas' },
  { id: '8', name: 'Filé de Tilápia Grelhado', quantity: 100, kcals: 128, protein: 26, carbs: 0, fats: 2.7, category: 'Proteínas' },
  { id: '10', name: 'Lombo de Porco Assado', quantity: 100, kcals: 210, protein: 31, carbs: 0, fats: 8.5, category: 'Proteínas' },
  { id: '62', name: 'Salmão Grelhado', quantity: 100, kcals: 208, protein: 22, carbs: 0, fats: 13, category: 'Proteínas' },
  { id: '10b', name: 'Sardinha em Conserva', quantity: 100, kcals: 174, protein: 22, carbs: 0, fats: 9.5, category: 'Proteínas' },
  { id: '7', name: 'Atum em Conserva (Água)', quantity: 100, kcals: 116, protein: 26, carbs: 0, fats: 0.8, category: 'Proteínas' },
  { id: '6', name: 'Atum em Conserva (Óleo)', quantity: 100, kcals: 285, protein: 16.6, carbs: 0, fats: 24, category: 'Proteínas' },

  // CARBOIDRATOS - ARROZ E GRÃOS
  { id: '11', name: 'Arroz Branco Cozido', quantity: 100, kcals: 128, protein: 2.5, carbs: 28.1, fats: 0.2, category: 'Carboidratos' },
  { id: '12', name: 'Arroz Integral Cozido', quantity: 100, kcals: 124, protein: 2.6, carbs: 25.8, fats: 1, category: 'Carboidratos' },
  { id: '12a', name: 'Quinoa Cozida', quantity: 100, kcals: 120, protein: 4.4, carbs: 21.3, fats: 1.9, category: 'Carboidratos' },
  { id: '22', name: 'Cuscuz de Milho', quantity: 100, kcals: 113, protein: 2.3, carbs: 25.4, fats: 0.2, category: 'Carboidratos' },
  { id: '22d', name: 'Milho Verde Cozido', quantity: 100, kcals: 108, protein: 3.3, carbs: 25.1, fats: 1.2, category: 'Carboidratos' },
  { id: '19', name: 'Aveia em Flocos', quantity: 100, kcals: 394, protein: 13.9, carbs: 66.6, fats: 8.5, category: 'Carboidratos' },
  { id: '19a', name: 'Farelo de Aveia', quantity: 100, kcals: 370, protein: 17.3, carbs: 66.2, fats: 7, category: 'Carboidratos' },

  // CARBOIDRATOS - TUBÉRCULOS
  { id: '15', name: 'Batata Inglesa Cozida', quantity: 100, kcals: 52, protein: 1.2, carbs: 11.9, fats: 0, category: 'Carboidratos' },
  { id: '16', name: 'Batata Doce Cozida', quantity: 100, kcals: 77, protein: 0.6, carbs: 18.4, fats: 0.1, category: 'Carboidratos' },
  { id: '18', name: 'Mandioca Cozida', quantity: 100, kcals: 125, protein: 0.6, carbs: 30, fats: 0.3, category: 'Carboidratos' },
  { id: '43c', name: 'Batata Baroa Cozida (Mandioquinha)', quantity: 100, kcals: 80, protein: 0.9, carbs: 18.9, fats: 0.2, category: 'Carboidratos' },
  { id: '22c', name: 'Inhame Cozido', quantity: 100, kcals: 118, protein: 1.5, carbs: 27.9, fats: 0.2, category: 'Carboidratos' },

  // CARBOIDRATOS - MASSAS E PÃES
  { id: '17', name: 'Macarrão de Trigo Cozido', quantity: 100, kcals: 158, protein: 5.8, carbs: 31, fats: 0.9, category: 'Carboidratos' },
  { id: '17a', name: 'Macarrão Integral Cozido', quantity: 100, kcals: 124, protein: 5.3, carbs: 26.5, fats: 0.8, category: 'Carboidratos' },
  { id: '20', name: 'Pão de Forma Integral', quantity: 100, kcals: 253, protein: 9.4, carbs: 49.9, fats: 3.7, category: 'Carboidratos' },
  { id: '22a', name: 'Pão Francês', quantity: 100, kcals: 300, protein: 8, carbs: 58.6, fats: 3.1, category: 'Carboidratos' },
  { id: '21', name: 'Tapioca (Goma)', quantity: 100, kcals: 243, protein: 0, carbs: 60, fats: 0, category: 'Carboidratos' },

  // LEGUMINOSAS
  { id: '13', name: 'Feijão Carioca Cozido', quantity: 100, kcals: 76, protein: 4.8, carbs: 13.6, fats: 0.5, category: 'Leguminosas' },
  { id: '14', name: 'Feijão Preto Cozido', quantity: 100, kcals: 77, protein: 4.5, carbs: 14, fats: 0.5, category: 'Leguminosas' },
  { id: '54', name: 'Lentilha Cozida', quantity: 100, kcals: 93, protein: 6.3, carbs: 15, fats: 0.5, category: 'Leguminosas' },
  { id: '55', name: 'Grão de Bico Cozido', quantity: 100, kcals: 164, protein: 8.9, carbs: 27, fats: 2.6, category: 'Leguminosas' },
  { id: '59', name: 'Edamame Cozido (Soja Verde)', quantity: 100, kcals: 122, protein: 11, carbs: 10, fats: 5, category: 'Leguminosas' },
  { id: '60', name: 'Feijão de Corda Cozido', quantity: 100, kcals: 116, protein: 7.3, carbs: 21, fats: 0.5, category: 'Leguminosas' },
  { id: '60a', name: 'Soja em Grãos Cozida', quantity: 100, kcals: 173, protein: 16.6, carbs: 9.9, fats: 9, category: 'Leguminosas' },

  // FRUTAS
  { id: '23', name: 'Banana Prata', quantity: 100, kcals: 98, protein: 1.3, carbs: 26, fats: 0.1, category: 'Frutas' },
  { id: '24', name: 'Banana Nanica', quantity: 100, kcals: 92, protein: 1.4, carbs: 23.8, fats: 0.1, category: 'Frutas' },
  { id: '25', name: 'Maçã Fuji Com Casca', quantity: 100, kcals: 56, protein: 0.3, carbs: 15.2, fats: 0, category: 'Frutas' },
  { id: '26', name: 'Abacaxi Pérola', quantity: 100, kcals: 48, protein: 0.9, carbs: 12.3, fats: 0.1, category: 'Frutas' },
  { id: '27', name: 'Mamão Papaia', quantity: 100, kcals: 40, protein: 0.5, carbs: 10.4, fats: 0.1, category: 'Frutas' },
  { id: '28', name: 'Laranja Pera', quantity: 100, kcals: 37, protein: 0.7, carbs: 8.9, fats: 0.1, category: 'Frutas' },
  { id: '30', name: 'Melancia', quantity: 100, kcals: 33, protein: 0.9, carbs: 8.1, fats: 0, category: 'Frutas' },
  { id: '31', name: 'Morango', quantity: 100, kcals: 30, protein: 0.9, carbs: 6.8, fats: 0.3, category: 'Frutas' },
  { id: '32', name: 'Abacate', quantity: 100, kcals: 96, protein: 1.2, carbs: 6, fats: 8.4, category: 'Frutas' },
  { id: '32a', name: 'Manga Palmer', quantity: 100, kcals: 60, protein: 0.8, carbs: 15, fats: 0.4, category: 'Frutas' },
  { id: '32d', name: 'Melão Amarelo', quantity: 100, kcals: 34, protein: 0.8, carbs: 8.2, fats: 0, category: 'Frutas' },
  { id: '32e', name: 'Goiaba Vermelha', quantity: 100, kcals: 54, protein: 1.1, carbs: 13, fats: 0.4, category: 'Frutas' },
  { id: '32f', name: 'Kiwi Nutricional', quantity: 100, kcals: 61, protein: 1.1, carbs: 14.7, fats: 0.5, category: 'Frutas' },
  { id: '32g', name: 'Uva Passa', quantity: 100, kcals: 299, protein: 3.1, carbs: 79.2, fats: 0.5, category: 'Frutas' },
  { id: '32h', name: 'Açaí (Polpa Pura)', quantity: 100, kcals: 58, protein: 0.8, carbs: 6.2, fats: 3.9, category: 'Frutas' },

  // VEGETAIS
  { id: '48', name: 'Brócolis Cozido', quantity: 100, kcals: 25, protein: 2.1, carbs: 4.4, fats: 0.5, category: 'Vegetais' },
  { id: '49', name: 'Cenoura Cozida', quantity: 100, kcals: 30, protein: 0.8, carbs: 6.7, fats: 0.2, category: 'Vegetais' },
  { id: '50', name: 'Alface Americana', quantity: 100, kcals: 9, protein: 0.6, carbs: 1.7, fats: 0.1, category: 'Vegetais' },
  { id: '51', name: 'Tomate Salada', quantity: 100, kcals: 15, protein: 1.1, carbs: 3.1, fats: 0.2, category: 'Vegetais' },
  { id: '52', name: 'Espinafre Refogado', quantity: 100, kcals: 67, protein: 2.7, carbs: 4.2, fats: 4.8, category: 'Vegetais' },
  { id: '53', name: 'Abóbora Cabotiá Cozida', quantity: 100, kcals: 48, protein: 1.4, carbs: 10.8, fats: 0.7, category: 'Vegetais' },
  { id: '53a', name: 'Abobrinha Refogada', quantity: 100, kcals: 24, protein: 1.1, carbs: 4.9, fats: 0.1, category: 'Vegetais' },
  { id: '53b', name: 'Couve Manteiga Refogada', quantity: 100, kcals: 90, protein: 2.4, carbs: 10.3, fats: 6.6, category: 'Vegetais' },
  { id: '53c', name: 'Pepino Japonês', quantity: 100, kcals: 15, protein: 0.7, carbs: 3.4, fats: 0.1, category: 'Vegetais' },
  { id: '53d', name: 'Repolho Branco Refogado', quantity: 100, kcals: 40, protein: 1, carbs: 8.5, fats: 0.1, category: 'Vegetais' },

  // GORDURAS E OLEAGINOSAS
  { id: '33', name: 'Azeite de Oliva Extra Virgem', quantity: 100, kcals: 884, protein: 0, carbs: 0, fats: 100, category: 'Gorduras' },
  { id: '35', name: 'Pasta de Amendoim Integrada', quantity: 100, kcals: 588, protein: 25, carbs: 20, fats: 50, category: 'Gorduras' },
  { id: '36', name: 'Castanha do Pará', quantity: 100, kcals: 643, protein: 14.5, carbs: 15.1, fats: 63.5, category: 'Gorduras' },
  { id: '37', name: 'Amêndoa Torrada sem Sal', quantity: 100, kcals: 581, protein: 21.9, carbs: 19.9, fats: 50.6, category: 'Gorduras' },
  { id: '37a', name: 'Castanha de Caju Torrada', quantity: 100, kcals: 553, protein: 18.2, carbs: 30.2, fats: 43.8, category: 'Gorduras' },

  // LATICÍNIOS
  { id: '38', name: 'Leite Integral', quantity: 100, kcals: 60, protein: 3.2, carbs: 4.8, fats: 3.3, category: 'Laticínios' },
  { id: '39', name: 'Leite Desnatado', quantity: 100, kcals: 35, protein: 3.3, carbs: 5, fats: 0.1, category: 'Laticínios' },
  { id: '40', name: 'Iogurte Natural Integral', quantity: 100, kcals: 51, protein: 4.1, carbs: 1.9, fats: 3, category: 'Laticínios' },
  { id: '42', name: 'Queijo Cottage', quantity: 100, kcals: 98, protein: 11, carbs: 3.4, fats: 4.3, category: 'Laticínios' },
  { id: '43', name: 'Queijo Minas Frescal', quantity: 100, kcals: 264, protein: 17.4, carbs: 3.2, fats: 20.2, category: 'Laticínios' },
  { id: '43d', name: 'Ricota', quantity: 100, kcals: 140, protein: 12.6, carbs: 3.8, fats: 8.1, category: 'Laticínios' },

  // SUPLEMENTOS
  { id: '44', name: 'Whey Protein Isolado', quantity: 100, kcals: 370, protein: 85, carbs: 3, fats: 2, category: 'Suplementos' },
  { id: '45', name: 'Whey Protein Concentrado', quantity: 100, kcals: 400, protein: 75, carbs: 10, fats: 6, category: 'Suplementos' },
  { id: '46', name: 'Creatina Monohidratada', quantity: 100, kcals: 0, protein: 0, carbs: 0, fats: 0, category: 'Suplementos' },
  { id: '47', name: 'Albumina (Pó)', quantity: 100, kcals: 350, protein: 80, carbs: 4, fats: 0, category: 'Suplementos' },
];

