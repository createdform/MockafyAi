import Link from 'next/link';

const NavBar = () => {
    return (
        <div style={{display: 'flex', width: '100%', marginTop: '20px', justifyContent: 'center'}}>
            <h4 style={{marginRight: '28px'}}>Example routes</h4>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/UserList">Users</Link>
                    </li>
                    <li>
                        <Link href="/ProductList">Products</Link>
                    </li>
                </ul>
            </nav>
        </div>

    );
};

export default NavBar;
