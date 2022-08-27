import { QuestionStore } from './question.store';

export class QuestionService {
  private store: QuestionStore;
  constructor() {
    this.store = new QuestionStore();
  }

  async getQuestions() {
    return await this.store.getQuestions();
  }

  async newQuestion(userId: string, question: string) {
    return await this.store.newQuestion(userId, question);
  }
}