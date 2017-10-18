<template>
  <div class = "container">
		<h1 id = "disclaimer">Please make your browser bigger!</h1>
		<div class = "buttons-row">
			<h2 id = "question">Do you want to play with a friend or with the ultra unbeatable computer?</h2>
			<button id = "two-players-btn">With a Friend</button>
			<button id = "one-player-btn">Bring on the Computer</button>
			<h2 id = "pick-color"></h2>
			<button id = "red-btn">Hotter than the Sun</button>
			<button id = "blue-btn">Ice Cold</button>
		</div>
		<div id="dialog">Is this a 3 button dialog?</div>
		<div class = "row">
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
			<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
  			<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
			<script src="data.js"></script>
			<script src="setup_game.js"></script>
			<script src="make_moves.js"></script>
			<script src="check_win.js"></script>


</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
