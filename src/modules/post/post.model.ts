import { IPost } from '../../modules/post/post.interface';

let persistencia: IPost[] = [
  {
    id: '0.5702798820561865',
    title: 'algo',
    body: 'algo',
  },
  {
    id: '0.8272472802160629',
    title: 'algo1',
    body: 'algo1',
  },
  {
    id: '0.7980948157864327',
    title: 'algo2',
    body: 'algo2',
  },
];

class PostModel {
  getAll = async function (): Promise<IPost[]> {
    return persistencia;
  };
  getOne = async function (id: string): Promise<IPost> {
    const postFound = persistencia.find((post) => post.id == id);
    if (!postFound) {
      throw 'post id not found in db';
    }
    return postFound;
  };
  create = async function (data: { title: string; body: string }): Promise<IPost> {
    const createdPost = { id: Math.random() + '', ...data };
    persistencia.push(createdPost);
    return createdPost;
  };
  put = async function (post: IPost): Promise<IPost> {
    const indexToUpdate = persistencia.findIndex((post) => post.id == post.id);
    if (indexToUpdate == -1) {
      throw 'post id not found in db';
    }
    persistencia[indexToUpdate] = post;
    return post;
  };
  delete = async function (id: string): Promise<boolean> {
    console.log(id);
    persistencia = persistencia.filter((post) => post.id != id);
    return true;
  };
}

export default PostModel;
