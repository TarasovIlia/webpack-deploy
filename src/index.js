import * as $ from 'jquery'
import Post from './models/post'
import WebpackLogo from './assets/webpack-logo'
import './babel'
import './styles/style.css'
import './styles/index.scss'

const post = new Post('Webpack kekkekke', WebpackLogo)

$('pre').addClass('code').html(post.toString())