
@extends('layout')


@section('head')

    <title>@yield('title', 'Admin panel')</title>

    <link rel="shortcut icon" href="{{ Vite::image('favicons/favicon.ico') }}" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ Vite::image('favicons/apple-touch-icon.png') }}">
    <link rel="apple-touch-icon" sizes="144x144" href="{{ Vite::image('favicons/apple-icon-144x144.png') }}">
    <link rel="apple-touch-icon" sizes="114x114" href="{{ Vite::image('favicons/apple-icon-114x114.png') }}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{ Vite::image('favicons/apple-icon-76x76.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ Vite::image('favicons/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ Vite::image('favicons/favicon-16x16.png') }}">
    <link rel="mask-icon" href="{{ Vite::image('favicons/safari-pinned-tab.svg') }}" color="#f2ab3c">

    <!-- Scripts -->
    @yield('script')

    <!-- Fonts -->
    @yield('fonts')
    @vite('resources/assets/admin/style/index.sass')

    <!-- Styles -->
    @yield('style')

@endsection

@section('body')

    @yield('container')

@endsection

