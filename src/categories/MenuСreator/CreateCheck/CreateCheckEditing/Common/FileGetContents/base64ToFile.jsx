import React, {useState} from 'react'
import CheckEditing from "../../CheckEditing";

const base64ToFile = (base64, name) => {
    mime = mime || '';
    var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1];
debugger;
    base64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

    console.log({mime});

    const sliceSize = 1024;
    const byteChars = window.atob(base64);
    const byteArrays = [];

    for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        const slice = byteChars.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new File(byteArrays, name, {type: mime});

}

export default base64ToFile;