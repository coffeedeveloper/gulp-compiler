var Test = React.createClass({
  render: function () {
    return (
      <div className="test-box">
      </div>
    )
  }
})

React.render(
  <Test />,
  document.getElementById('wrap')
)
