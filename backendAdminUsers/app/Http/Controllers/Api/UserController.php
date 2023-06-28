<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::All();
        return $users;
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->nombre = $request->nombre;
        $user->apellidos = $request->apellidos;
        $user->contrasena = $request->contrasena;
        $user->correo = $request->correo;
        $user->rol = $request->rol;

        $user->save();

        return User::All();
    }

    public function show($id)
    {
        $user = User::find($id);
        return $user;
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->nombre = $request->nombre;
        $user->apellidos = $request->apellidos;
        $user->contrasena = $request->contrasena;
        $user->correo = $request->correo;
        $user->rol = $request->rol;

        $user->save();
        return User::All();
    }

    public function destroy($id)
    {
        User::destroy($id);

        return User::All();
    }
}
