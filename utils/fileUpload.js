
export const fileUpload = async(file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/diuesywix/upload'

    const formData = new FormData();
    formData.append('upload_preset', "hotel-react");
    formData.append('file', file);

    try {
        const response = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        })

        if(response.ok){
            const cloudResp = await response.json()
            return cloudResp.secure_url
        }else{
            throw new Error('No se pudo subir el archivo')
        }

    } catch (error) {
       throw error;
    }

}