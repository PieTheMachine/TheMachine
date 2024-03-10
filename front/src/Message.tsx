function Message(){

    const name = "testname";
    if(name){
        return(
            <h1>Hello {name}</h1>
        );
    }else{
        return(
            <h1>Hello test</h1>
        );
    }
    
}

export default Message;