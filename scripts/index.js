var NODE_RADIUS = 0.1;

var color = d3.scale.category20();

var force = d3.layout.force3D()
	.charge(-2)
	.linkDistance(0.5)
	.size([10, 10, 10]);

var scene = d3.select("a-scene");

var graph = getGraph();

force
	.nodes(graph.nodes)
	.links(graph.links)
	.start();

var node = scene
	.selectAll(".node")
	.data(graph.nodes)
	.enter().append("a-sphere")
	.attr("radius", NODE_RADIUS)
	.attr("color", function (d) {
		return color(d.group);
	})
	.call(force.drag);

force.on("tick", function () {
	node.attr("position", function (d) {
		return [d.x, d.y, d.z].join(" ");
	});
});

function getGraph() {
	return {
		nodes: [{
				name: "foo",
				group: 1
			},
			{
				name: "bar",
				group: 1
			},
			{
				name: "baz",
				group: 1
			},
			{
				name: "fizz",
				group: 1
			},
			{
				name: "buzz",
				group: 1
			},
		],
		links: [{
				source: 0,
				target: 1,
				value: 1
			},
			{
				source: 1,
				target: 2,
				value: 1
			},
			{
				source: 2,
				target: 3,
				value: 1
			},
			{
				source: 3,
				target: 4,
				value: 1
			},
			{
				source: 4,
				target: 1,
				value: 1
			},
		]
	}
}
