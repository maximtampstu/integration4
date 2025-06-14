//first tryed with the react router QR code maker but that did not work so AI helpt me and i changed some thinks to fit it to what i need
import QRCode from 'qrcode-generator';

const QRCodeSVG = ({ value, size = 4 }) => {
    const qr = QRCode(size, 'L');
    qr.addData(value);
    qr.make();

    const svgTag = qr.createSvgTag({
        scalable: true,
        margin: 2,
    });    

    return (
        <div
            className='qr'
            dangerouslySetInnerHTML={{ __html: svgTag }}
        />
    );
};

export default QRCodeSVG;
