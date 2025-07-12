@extends('admin/base')

@section('script')
    @viteReactRefresh
    @vite('resources/assets/admin/main.jsx')
@endsection



@section('container')
    <div id="root"></div>
@endsection
