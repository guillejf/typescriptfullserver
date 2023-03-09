import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '../../middleware/validation.middleware';
import PostService from '../../modules/post/post.service';
import validate from '../../modules/post/post.validation';
import HttpException from '../../utils/exceptions/http.exception';
import Controller from '../../utils/interfaces/controller.interface';
import axios from 'axios';

class PostController implements Controller {
  public path = '/post';
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}`, validationMiddleware(validate.create), this.create);
    this.router.get(`${this.path}`, this.getAll);
    this.router.get(`${this.path}/:id`, this.getOne);
    this.router.put(`${this.path}/:id`, validationMiddleware(validate.create), this.put);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const body = req.body as { title: string; body: string };
      const post = await this.PostService.create(body);
      res.status(201).json(post);
    } catch (error: any) {
      next(new HttpException(500, 'Cannot create post. ' + error?.message || ''));
    }
  };

  private getOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const postFound = await this.PostService.getOne(id);
      res.status(200).json(postFound);
    } catch (error: any) {
      next(new HttpException(500, 'Cannot get this posts. ' + error?.message || ''));
    }
  };

  private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const allPosts = await this.PostService.getAll();
      res.status(200).json(allPosts);
    } catch (error: any) {
      next(new HttpException(500, 'Cannot get all posts. ' + error?.message || ''));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id } = req.params;
    try {
      await this.PostService.delete(id);
      res.status(200).send({ success: 'ok' });
    } catch (error: any) {
      next(new HttpException(500, 'Cannot delete this post: ' + id + '. ' + error?.message || ''));
    }
  };

  private put = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id } = req.params;
    const post = req.body;
    try {
      const updatedPost = await this.PostService.put({ id, ...post });
      res.status(200).json(updatedPost);
    } catch (error: any) {
      next(new HttpException(500, 'Cannot update post: ' + id + ' with this data ' + JSON.stringify(post) + '. ' + error?.message || ''));
    }
  };
}

export default PostController;
