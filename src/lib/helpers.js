import { slugFilter } from "@/lib/filters";

export const uniqueArray = originalArray => [...new Set(originalArray)];

export const getPostsFromTag = (posts, tag) =>
  posts.filter(post => post.tags.map(tag => slugFilter(tag)).includes(tag));

export const tagRoutes = posts => {
  let tagsArray = [];
  for (var i = 0; i < this.posts.length; i++) {
    for (var n = 0; n < this.posts[i].tags.length; n++) {
      tagsArray.push(this.posts[i].tags[n]);
    }
  }
  return uniqueArray(tagsArray);
};
