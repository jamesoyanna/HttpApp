import React, { Component } from "react";
import httpService from "./services/httpService";
import config from "./config.json";
import './App.css';



class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const {data:posts} = await httpService.get(config.apiEndpoint);
    this.setState({posts})
     
  }

  handleAdd = async ()=>{
    const obj =  {title: "I am a winner", body: "When are we going to end sars in Nigeria"}
    const {data: post} =  await httpService.post(config.apiEndpoint, obj )
    const posts = [post,...this.state.posts]
    this.setState({posts})

  }

handleUpdate = async post =>{
 post.title = "You updated me";
 await httpService.put(config.apiEndpoint + "/" + post.id, post);

 const posts  = [...this.state.posts];
 const index = posts.indexOf(post);
 posts[index] = {...post}
 this.setState({posts});


}

handleDelete = async (post) =>{
  const originalPosts = this.state.posts
const posts = this.state.posts.filter(p => p.id !== post.id)
this.setState({posts})

try{
await httpService.delete( config.apiEndpoint + "/" + post.id);
}catch(ex){
  if (ex.response && ex.response.status ===404)

  alert("This post has already been deleted");
 
  this.setState({posts: originalPosts})

}
}

  render() {
    return (
      <>
        <button className="btm btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post =>(
              <tr key={post.id}>
               <td>{post.title}</td> 
               <td>
                 <button className="btn btn-info btn-sm"
                 onClick={()=>this.handleUpdate(post)}>
                   Update
                 </button>
               </td>
               <td>
                 <button
                 className="btn btn-danger btn-sm"
                 onClick={() =>this.handleDelete(post)}
                 >
                 Delete
                 </button>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
