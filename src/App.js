import React, { Component } from "react";
import axios from "axios";
import './App.css';
import { indexOf } from "lodash";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts"

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const {data:posts} = await axios.get(apiEndpoint);
    this.setState({posts})
     
  }

  handleAdd = async ()=>{
    const obj =  {title: "I am a winner", body: "When are we going to end sars in Nigeria"}
    const {data: post} =  await axios.post(apiEndpoint, obj )
    const posts = [post,...this.state.posts]
    this.setState({posts})

  }

handleUpdate = async post =>{
  post.title ="Post Updated"
  axios.put(apiEndpoint + "/" + post.id, post)
  const posts = [...this.state.posts]
  const index = posts.indexOf(post)
  posts[index] = {...post}
  this.setState({posts})


}

handleDelete = (post) =>{
console.log("Delete", post)
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
