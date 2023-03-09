import { IContent } from 'utils/interfaces/content.interface';
import ContentModel from '../../modules/content/content.model';

class ContentService {
  private ContentModel = new ContentModel();

  public async getCurrentContents(): Promise<IContent> {
    try {
      const currentContents = await this.ContentModel.getCurrentContents();
      return currentContents;
    } catch (error) {
      throw new Error('Db unable to get all contents.');
    }
  }
}

export default ContentService;
