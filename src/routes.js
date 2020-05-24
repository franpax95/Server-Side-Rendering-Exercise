import Home from './components/Home';
import DoggyFamily from './components/DoggyFamily';
import DogsName from './components/DogsName';
import DogsColor from './components/DogsColor';

export default [
    {
        name: "Home",
        path: "/",
        exact: true,
        component: Home
    },
    {
        name: "DoggyFamily",
        path:"/dogs",
        component: DoggyFamily,
        routes: [
            {
                name: "Name",
                path: "/dogs",
                exact: true,
                component: DogsName
            },
            {
                name: "Color",
                path: "/dogs/color/:color",
                exact: true,
                component: DogsColor,
                linkPath: "/dogs/color/orange"
            }
        ]
    }
];