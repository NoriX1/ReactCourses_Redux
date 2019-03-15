import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = async () => {
    // Bad approach!!!
    // 1. Action creators must return plain JS objects with a type property
    // But in some cases we returned an REQUEST object, which is not plain
    // In case if when we want to remove async await syntax:
    // 2. By the time our actions gets to a reducer, we won`t have
    // fetched our data!
    // So, in this case we haven`t got response and we haven`t got data,
    // when action is called and dispatched.
    const response = await jsonPlaceholder.get('/posts');
    return {
        type: 'FETCH_POSTS',
        payload: response
    };
};