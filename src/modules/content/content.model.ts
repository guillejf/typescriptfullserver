import { currentTemplatesData } from '../../assets/content/currentTemplates';
import { contentLanguages } from '../../assets/content/languages';
import { IContent } from '../../utils/interfaces/content.interface';

class ContentModel {
  getCurrentContents = async function (): Promise<IContent> {
    return { currentTemplatesData, contentLanguages };
  };
}

export default ContentModel;
