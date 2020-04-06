import { mount } from '@vue/test-utils';
import Post from '@/components/Post.vue';


describe('Post', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(Post, {
      propsData: {
        post: {
          title: 'Sacrifices must be made',
          author: 'SquanchOne',
          comments: 1479,
          created: 1586157188,
          thumbnail: 'https://b.thumbs.redditmedia.com/SC41gYsdw75RUkzQCj8aoAy_lOghr_0bAXGzNGfmx_A.jpg',
          image: 'https://i.redd.it/82j0obsi03r41.jpg',
          hasImage: true,
          read: false,
        },
      },
    });
  });

  it('has come as unread', () => {
    expect(cmp.vm.post.read).toEqual(false);
  });

  it('has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
