export function handle(state, action) {
    if (action.input.function === 'initialize') {
      state.author = action.caller
    }

    if (action.input.function === 'uploadData' && action.caller === state.author) {
      const documents = state.documents
      documents[action.input.doc.uid] = action.input.doc
      state.documents = documents
    }

    // if (action.input.function === 'updatePost' && action.caller === state.author) {
    //   const posts = state.posts
    //   const postToUpdate = action.input.post
    //   posts[postToUpdate.id] = postToUpdate
    //   state.posts = posts
    // }

    // if (action.input.function === 'deletePost' && action.caller === state.author) {
    //   const posts = state.posts
    //   delete posts[action.input.post.id]
    //   state.posts = posts
    // }
    return { state }
  }