import { IPost } from '../../modules/post/post.interface';
import PostModel from '../../modules/post/post.model';

class PostService {
  private PostModel = new PostModel();

  public async create(data: { title: string; body: string }): Promise<IPost> {
    try {
      return await this.PostModel.create(data);
    } catch (error) {
      throw new Error('Db unable to create post. ');
    }
  }

  public async getAll(): Promise<IPost[]> {
    try {
      const allPosts = await this.PostModel.getAll();
      return allPosts;
    } catch (error) {
      throw new Error('Db unable to get all posts.');
    }
  }

  public async getOne(id: string): Promise<IPost> {
    try {
      const postFound = await this.PostModel.getOne(id);
      return postFound;
    } catch (error) {
      throw new Error('Db unable to get posts with id: ' + id);
    }
  }

  public async put(post: IPost): Promise<IPost> {
    try {
      await this.PostModel.put(post);
      return post;
    } catch (error) {
      throw new Error('Db unable update posts.');
    }
  }

  public async delete(id: string) {
    try {
      await this.PostModel.delete(id);
      return true;
    } catch (error) {
      throw new Error('Db unable to erase posts.');
    }
  }
}

export default PostService;
