// Criar o componente "Lista de Productos"
class ProductList extends React.Component {

    /* constructor(props){
        super(props);

        this.state = {
            products: [] ,
        }

        this.handleProductUpVote = this.handleProductUpVote.bind(this);
    } */

    state = {
        products: [] ,
        descendent: true,
    }

    componentDidMount = () => {
        this.setState({
            products: Seed.products,
        })
    }

    sortProducts = () => {
        this.setState({
            descendent: !this.state.descendent
        })
    }
    

    handleProductUpVote = (productId) => {
        console.log(` Producto com id: ${productId} foi votado! `);
        const nextProducts = this.state.products.map( product => {
            if (productId === product.id) {
                return Object.assign( {}, product, {
                    votes: product.votes + 1
                } )
            } else {
                return product;
            }
        });
        this.setState({
            products: nextProducts,
        })
    }

    handleProductDownVote = (productId) => {
        // console.log(` Producto com id: ${productId} foi votado! `);
        const nextProducts = this.state.products.map( product => {
            if (productId === product.id) {
                return Object.assign( {}, product, {
                    votes: product.votes - 1
                } )
            } else {
                return product;
            }
        });
        this.setState({
            products: nextProducts,
        })
    }


    
    // RENDER
    render(){
        
        // const product = Seed.products[3];
        const sortedProducts = this.state.products.sort(
            (a,b) => this.state.descendent ? (b.votes - a.votes) : (a.votes - b.votes)
        );
        const products = sortedProducts.map( product => 
            <Product 
                id={product.id}
                key={`product-${product.id}`}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                onVote={this.handleProductUpVote}
                onVoteDown={this.handleProductDownVote}
            />    
        )

        return( 
            <div className="ui unstackable items">
                <a onClick={this.sortProducts}>
                    <i className="refresh icon"></i>
                </a>
                {products}
            </div>
        );
    }
}

// Criar o componente "Productos"
class Product extends React.Component {

    /* constructor(props){
        super(props);

        this.handleUpVote = this.handleUpVote.bind(this)
    } */

    handleUpVote = () => {
        this.props.onVote(this.props.id);
    }

    handleDownVote = () => {
        this.props.onVoteDown(this.props.id);
    }

    

    render(){
        return( 
            <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl} />
                </div>
                <div className='middle aligned content'>
                    <div className="header">
                        <a onClick={this.handleUpVote}>
                            <i className="large caret up icon"></i>
                        </a>
                        {this.props.votes}
                        <a onClick={this.handleDownVote}>
                            <i className="large caret down icon"></i>
                        </a>
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>
                            {this.props.title} 
                        </a>
                        <p> {this.props.description} </p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by: </span>
                        <img className='ui avatar image' src={this.props.submitterAvatarUrl} />
                    </div>
                </div>
           </div>
        );
    }
}


ReactDOM.render( <ProductList />, document.getElementById('content') );
