import React, {useState} from 'react';
import axios from 'axios';

const App = () => {

    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });

    //destructure values from state
    const{title, content, user} = state;

    //onChange event handler
    // const handleChange = (name) => (event) => {
    //     // console.log('name', name, 'event', event.target.value);
    //     setState({...state, [name]: event.target.value});
    // };

    function handleChange(name) {
        return function(event) {
            setState({ ...state, [name]: event.target.value});
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({title, content, user})
        axios.post(`${process.env.REACT_APP_API}/post`, { title, content, user })
        .then(response => {
            console.log(response)
            //empty state
            setState({ ...state, title: '', content: '', user: ''} );
            //show success alert
            alert(`Post Titled ${response.data.title} is Created`);
        })
        .catch(error => {
            console.log(error.Response)
            alert(error.response.data.error)
        })
    };

  return (
    <div className="container p-5">
      <h1>CREATE POST</h1>
      <br/>
      {/* {JSON.stringify(state)} */}
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label className="text-muted">Title</label>
              <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Post Title" required/>
          </div>
          <div className="form-group">
              <label className="text-muted">Content</label>
              <textarea onChange={handleChange('content')} value={content} type="text" className="form-control" placeholder="Write Something" required/>
          </div>
          <div className="form-group">
              <label className="text-muted">User</label>
              <input onChange={handleChange('user')} value={user} type="text" className="form-control" placeholder="Your Name" required/>
          </div>
          <div>
              <button className="btn btn-primary">Create</button>
          </div>
      </form>
    </div>
  );
}

export default App;
