
export const renderPredictions = ( predictions , ctx ) => {
    ctx.clearRect( 0 , 0 , ctx.canvas.width , ctx.canvas.height )

    // Fonts
    const font = '16px sans-serif'
    ctx.font = font
    ctx.textBaseline = "top"

    predictions.forEach( prediction => {
        const [ x, y, width, height ] = prediction["bbox"];

        const isPerson = prediction.class === "person"
        
        // ? if its a person
        ctx.strokeStyle = isPerson ? '#AFE1AF' : '#ECFFDC'
        ctx.lineWidth = 4
        ctx.strokeRect(x, y, width ,height);

        // ? fill color
        ctx.fillStyle = isPerson ? `rgba(159, 226, 191 , 0.2)` : 'rgba(236, 255, 220 , 0.2)' ;
        ctx.fillRect(x , y , width , height)

        // ? add Label
        ctx.fillStyle = isPerson ? '#AFE1AF' : "#ECFFDC"
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font , 10)//base 10
        ctx.fillRect(x,y,textWidth + 4 , textHeight + 4)

        // to ensure at top
        ctx.fillStyle = "#000000"
        ctx.fillText(prediction.class , x , y)


    } )
}