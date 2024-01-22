import App from './app.js'
function main(){
    try {
      App.listen(5001, () => {
        console.log("Server started")
      })  
    } catch (error) {
        console.log(`Server error: ${error}`)
    }
}

main()