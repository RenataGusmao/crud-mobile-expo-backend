import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = 'https://gerenciador-de-tarefas-1-w2dz.onrender.com';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('');
  const [categoria, setCategoria] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarTarefas();
  }, []);

  async function buscarTarefas() {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/tasks`);
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      Alert.alert('Erro', 'Nao foi possivel buscar as tarefas.');
    } finally {
      setCarregando(false);
    }
  }

  async function salvarTarefa() {
    if (!titulo) {
      Alert.alert('Atencao', 'Digite o titulo da tarefa.');
      return;
    }

    const tarefa = {
      title: titulo,
      status: status,
      category: categoria
    };

    try {
      if (idEditando) {
        await fetch(`${API_URL}/tasks/${idEditando}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarefa)
        });
      } else {
        await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarefa)
        });
      }

      limparFormulario();
      buscarTarefas();
    } catch (erro) {
      Alert.alert('Erro', 'Nao foi possivel salvar a tarefa.');
    }
  }

  function editarTarefa(tarefa) {
    setIdEditando(tarefa._id);
    setTitulo(tarefa.title);
    setStatus(tarefa.status);
    setCategoria(tarefa.category);
  }

  async function excluirTarefa(id) {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });

      buscarTarefas();
    } catch (erro) {
      Alert.alert('Erro', 'Nao foi possivel excluir a tarefa.');
    }
  }

  function limparFormulario() {
    setIdEditando(null);
    setTitulo('');
    setStatus('');
    setCategoria('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Gerenciador de Tarefas</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={setStatus}
        />

        <TextInput
          style={styles.input}
          placeholder="Categoria"
          value={categoria}
          onChangeText={setCategoria}
        />

        <Button
          title={idEditando ? 'Atualizar tarefa' : 'Cadastrar tarefa'}
          onPress={salvarTarefa}
        />

        {idEditando && (
          <View style={styles.botaoCancelar}>
            <Button title="Cancelar edicao" color="#777" onPress={limparFormulario} />
          </View>
        )}
      </View>

      <Text style={styles.subtitulo}>Tarefas cadastradas:</Text>

      {carregando ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.texto}>Titulo: {item.title}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Categoria: {item.category}</Text>

              <View style={styles.botoes}>
                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={() => editarTarefa(item)}
                >
                  <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => excluirTarefa(item._id)}
                >
                  <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20
  },
  formulario: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10
  },
  botaoCancelar: {
    marginTop: 10
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10
  },
  texto: {
    fontWeight: 'bold'
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 10
  },
  botaoEditar: {
    backgroundColor: '#1976d2',
    padding: 8,
    borderRadius: 4,
    marginRight: 10
  },
  botaoExcluir: {
    backgroundColor: '#d32f2f',
    padding: 8,
    borderRadius: 4
  },
  textoBotao: {
    color: '#fff'
  }
});
