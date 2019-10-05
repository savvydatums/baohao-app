export class PostModel {

    public allPost:any = {};

    // structure { cat1: {}, cat2: {} }
    constructor() {}

    public addDataToCategory (category, posts) {        

        const postArray = Object.keys(posts).map (key => {
            return posts[key]
        })

        this.allPost[category] = postArray
    }
}