import React, { Component } from "react";

class AppRouter extends Component {
  components = {
    foo: FooComponent,
    bar: BarComponent
  };
  render() {
    const TagName = this.components[this.props.tag || "foo"];
    return <TagName />;
  }
}
export default AppRouter;
