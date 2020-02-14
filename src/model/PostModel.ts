export class PostModel {

    public allPost:any = {};

    constructor() {}

    public addDataToCategory (category, posts) {        

        let postArray = []
        if (posts !== null) {
            postArray = Object.keys(posts).map (key => {
                return posts[key]
            })
        }
        this.allPost[category] = postArray
    }
}