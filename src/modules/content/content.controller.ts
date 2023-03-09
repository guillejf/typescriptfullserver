import { NextFunction, Request, Response, Router } from 'express';
import ContentService from '../../modules/content/content.service';
import HttpException from '../../utils/exceptions/http.exception';
import Controller from '../../utils/interfaces/controller.interface';

class ContentController implements Controller {
  public path = '/content';
  public router = Router();
  private ContentService = new ContentService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getCurrentContents);
  }

  private getCurrentContents = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const currentContents = await this.ContentService.getCurrentContents();
      res.status(200).json(currentContents);
    } catch (error: any) {
      next(new HttpException(500, 'Cannot get current contents .' + error?.message || ''));
    }
  };
}

export default ContentController;
