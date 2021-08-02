import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Nav from './Nav';

const UpdatePost = props => {
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        user: ''
    })

    const {title, content, slug, user} = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                const {title, content, slug, user} = response.data
                setState({...state, title, content, slug, user})
            })
            .catch(error => alert('Error Loading Single Post'));
    }, []);

    const showUpdateForm = () => (
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
              <button className="btn btn-primary">Update</button>
          </div>
      </form>
    )

    function handleChange(name) {
        return function(event) {
            setState({ ...state, [name]: event.target.value});
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({title, content, user})
        axios
            .put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, user })
            .then(response => {

                console.log(response)
                const {title, content, slug, user} = response.data
                
                //empty state
                setState({ ...state, title, content, slug, user} );
                //show success alert
                alert(`Post Titled ${title} is Updated`);
            })
            .catch(error => {
                console.log(error.Response)
                alert(error.response.data.error)
            })
    };


    return (
        <div className="container p-5">
            <Nav />
            <br />
            <h1>UPDATE POST</h1>
            {showUpdateForm()}
        </div>
    )
}

export default UpdatePost;