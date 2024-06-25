import React from "react";
import TodoList from "./TodoList";
import Footer from "./Footer";

const Home = () => {
    return (
        <div>
            <div className="FormBack">
                <div className="content">
                    <TodoList />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;