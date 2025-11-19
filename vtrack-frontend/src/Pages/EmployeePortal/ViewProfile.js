import { useSelector } from 'react-redux';
import "../../CSS/profile.css";
import { useState, useEffect } from 'react';
import LZString from 'lz-string'; 
import Header from '../../Components/Header';

const ViewProfile = () => {
    const [storedData, setStoredData] = useState(null);
    const getData = useSelector(state => state.profileDetails);

    useEffect(() => {
        if (Object.keys(getData).length > 0) {
            try {
                const compressedData = LZString.compressToUTF16(JSON.stringify(getData));
                localStorage.setItem('ViewData', compressedData);
            } catch (e) {
                console.error("Failed to store data in localStorage:", e);
            }
        }
    }, [getData]);

    useEffect(() => {
        const data = localStorage.getItem('ViewData');
        if (data) {
            setStoredData(JSON.parse(LZString.decompressFromUTF16(data)));
        }
    }, []);

    // const arrayBufferToBase64 = (buffer) => {
    //     let binary = '';
    //     const bytes = new Uint8Array(buffer);
    //     for (let i = 0; i < bytes.byteLength; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //     }
    //     return window.btoa(binary);
    // };

    const filteredData = Object.entries(storedData || {}).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('T')) {
            value = value.split('T')[0];
        }
        return [key, value];
    });

    const det = filteredData.filter(([key]) => key !== 'emp_photo' && key !== 'emp_password');
    const half = Math.ceil(det.length / 2);
    const firstHalf = det.slice(0, half);
    const secondHalf = det.slice(half);

    const formatKey = (key) => {
        return key.replace('e_', '')
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const showPDF = (pdf) => {
        window.open(`http://192.168.2.120:3003/files/${pdf}`);
    };

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-card">
                <div className="profile-image">
                    <img 
                        src={`http://192.168.2.120:3003/images/${storedData?.emp_photo}`}
                        alt="Employee" 
                    />
                </div>
                <div className="profile-details">
                    <div className="table-container">
                        <table>
                            <tbody>
                                {firstHalf.map(([key, value], index) => (
                                    <tr key={index}>
                                        <td className="label">{formatKey(key)}</td>
                                        <td>:</td>
                                        <td className="value">{key === "resume" ? <button onClick={() => showPDF(value)}>View PDF</button> : value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                {secondHalf.map(([key, value], index) => (
                                    <tr key={index}>
                                        <td className="label">{formatKey(key)}</td>
                                        <td>:</td>
                                        <td className="value">{key === "resume" ? <button onClick={() => showPDF(value)}>View PDF</button> : value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;
