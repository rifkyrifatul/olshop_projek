import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api';

/**
 * Halaman untuk membuat transaksi penjualan baru dengan desain yang lebih modern.
 */
function CreateSalePage() {
    const navigate = useNavigate();

    // State untuk data master
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    
    // State untuk form
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [cart, setCart] = useState([]);
    const [currentItem, setCurrentItem] = useState({ productId: '', quantity: 1 });

    // State untuk UI
    const [loading, setLoading] = useState(true);
    const [submitError, setSubmitError] = useState('');

    // Mengambil data pelanggan dan produk
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customersRes, productsRes] = await Promise.all([
                    apiClient.get('/customers'),
                    apiClient.get('/products')
                ]);
                setCustomers(customersRes.data.data);
                setProducts(productsRes.data.data);
            } catch (error) {
                console.error("Gagal mengambil data master:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Menambah item ke keranjang
    const handleAddItemToCart = () => {
        if (!currentItem.productId || currentItem.quantity < 1) {
            alert("Pilih produk dan masukkan kuantitas yang valid.");
            return;
        }
        const productToAdd = products.find(p => p.id.toString() === currentItem.productId);
        if (!productToAdd) return;
        
        if (productToAdd.stock < currentItem.quantity) {
             alert(`Stok untuk produk "${productToAdd.product_name}" tidak mencukupi.`);
            return;
        }

        const existingItemIndex = cart.findIndex(item => item.id === productToAdd.id);
        if (existingItemIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity = parseInt(updatedCart[existingItemIndex].quantity) + parseInt(currentItem.quantity);
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...productToAdd, quantity: parseInt(currentItem.quantity) }]);
        }
        setCurrentItem({ productId: '', quantity: 1 });
    };
    
    // Menghapus item dari keranjang
    const handleRemoveItem = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // Menghitung total harga
    const calculateTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = calculateTotal();

    // Mengirim data transaksi ke backend
    const handleSubmitTransaction = async () => {
        if (cart.length === 0) { alert("Keranjang masih kosong."); return; }
        if (!selectedCustomerId) { alert("Silakan pilih pelanggan."); return; }

        setLoading(true);
        setSubmitError('');

        const transactionData = {
            customer_id: selectedCustomerId,
            cart: cart.map(item => ({ product_id: item.id, quantity: item.quantity })),
        };

        try {
            const response = await apiClient.post('/orders', transactionData);
            alert(response.data.message || 'Transaksi berhasil disimpan!');
            navigate('/sales');
        } catch (error) {
            console.error("Gagal menyimpan transaksi:", error);
            const errorMessage = error.response?.data?.error || 'Terjadi kesalahan yang tidak diketahui.';
            setSubmitError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Style object untuk desain yang lebih rapi
    const styles = {
        container: { display: 'flex', gap: '30px', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7f6' },
        leftPanel: { flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' },
        rightPanel: { flex: 1, backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' },
        card: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' },
        select: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
        input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' },
        button: { padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
        cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '10px 0' },
        totalSection: { marginTop: '20px', borderTop: '2px solid #333', paddingTop: '15px', fontSize: '1.2em', fontWeight: 'bold' },
    };
    
    if (loading && products.length === 0) return <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>Memuat data...</div>;

    return (
        <div style={styles.container}>
            {/* Kolom Kiri: Input Form */}
            <div style={styles.leftPanel}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1 style={{color: '#333'}}>Input Penjualan</h1>
                    <Link to="/dashboard"><button style={{...styles.button, backgroundColor: '#6c757d', color: 'white'}}>Kembali</button></Link>
                </div>
                
                <div style={styles.card}>
                    <h3>1. Pilih Pelanggan</h3>
                    <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)} style={styles.select}>
                        <option value="">-- Pilih Pelanggan --</option>
                        {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.customer_name}</option>)}
                    </select>
                </div>

                <div style={styles.card}>
                    <h3>2. Tambah Produk ke Keranjang</h3>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                        <div style={{ flex: 3 }}>
                            <label style={{display: 'block', marginBottom: '5px'}}>Produk</label>
                            <select value={currentItem.productId} onChange={(e) => setCurrentItem({...currentItem, productId: e.target.value})} style={styles.select}>
                                <option value="">-- Pilih Produk --</option>
                                {products.map(product => <option key={product.id} value={product.id}>{product.product_name} (Stok: {product.stock})</option>)}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{display: 'block', marginBottom: '5px'}}>Kuantitas</label>
                            <input type="number" min="1" value={currentItem.quantity} onChange={(e) => setCurrentItem({...currentItem, quantity: e.target.value})} style={styles.input} />
                        </div>
                        <button onClick={handleAddItemToCart} style={{...styles.button, backgroundColor: '#007bff', color: 'white', height: '45px'}}>Tambah</button>
                    </div>
                </div>
            </div>

            {/* Kolom Kanan: Keranjang dan Total */}
            <div style={styles.rightPanel}>
                <h2>Keranjang Belanja</h2>
                <div style={{ minHeight: '300px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                    {cart.length === 0 ? <p style={{color: '#666'}}>Keranjang masih kosong.</p> : cart.map(item => (
                        <div key={item.id} style={styles.cartItem}>
                            <div>
                                <p style={{ margin: 0, fontWeight: 'bold' }}>{item.product_name}</p>
                                <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>
                                    {item.quantity} x {new Intl.NumberFormat('id-ID').format(item.price)}
                                </p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                               <p style={{ margin: 0, fontWeight: 'bold', minWidth: '100px', textAlign: 'right' }}>
                                 {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price * item.quantity)}
                               </p>
                                <button onClick={() => handleRemoveItem(item.id)} style={{...styles.button, backgroundColor: 'transparent', color: 'red', padding: '5px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={styles.totalSection}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Total</span>
                        <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total)}</span>
                    </div>
                </div>
                {submitError && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {submitError}</p>}
                <button onClick={handleSubmitTransaction} disabled={loading || cart.length === 0} style={{ ...styles.button, width: '100%', padding: '15px', fontSize: '18px', marginTop: '20px', backgroundColor: '#28a745', color: 'white' }}>
                    {loading ? 'Menyimpan...' : 'Bayar & Simpan Transaksi'}
                </button>
            </div>
        </div>
    );
}

export default CreateSalePage;
